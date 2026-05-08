package com.imane.medicineapi.medicine;

import com.imane.medicineapi.auth.AppUser;
import com.imane.medicineapi.auth.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final AppUserRepository appUserRepository;

    public MedicineService(
            MedicineRepository medicineRepository,
            AppUserRepository appUserRepository
    ) {
        this.medicineRepository = medicineRepository;
        this.appUserRepository = appUserRepository;
    }

    public List<MedicineResponse> findAll() {
        String email = getCurrentUserEmail();

        return medicineRepository.findAllByUserEmail(email)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MedicineResponse findById(Long id) {
        Medicine medicine = getMedicineOrThrow(id);
        return toResponse(medicine);
    }

    public MedicineResponse create(MedicineRequest request) {
        AppUser currentUser = getCurrentUser();

        Medicine medicine = new Medicine();
        medicine.setName(request.name());
        medicine.setDose(request.dose());
        medicine.setTime(request.time());
        medicine.setFrequency(request.frequency());
        medicine.setNotes(request.notes());
        medicine.setUser(currentUser);

        Medicine savedMedicine = medicineRepository.save(medicine);
        return toResponse(savedMedicine);
    }

    public MedicineResponse update(Long id, MedicineRequest request) {
        Medicine medicine = getMedicineOrThrow(id);

        medicine.setName(request.name());
        medicine.setDose(request.dose());
        medicine.setTime(request.time());
        medicine.setFrequency(request.frequency());
        medicine.setNotes(request.notes());

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return toResponse(updatedMedicine);
    }

    public void delete(Long id) {
        Medicine medicine = getMedicineOrThrow(id);
        medicineRepository.delete(medicine);
    }

    private Medicine getMedicineOrThrow(Long id) {
        String email = getCurrentUserEmail();

        return medicineRepository.findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Medicine not found with id: " + id
                ));
    }

    private AppUser getCurrentUser() {
        String email = getCurrentUserEmail();

        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Authenticated user not found"
                ));
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    private MedicineResponse toResponse(Medicine medicine) {
        return new MedicineResponse(
                medicine.getId(),
                medicine.getName(),
                medicine.getDose(),
                medicine.getTime(),
                medicine.getFrequency(),
                medicine.getNotes()
        );
    }
}

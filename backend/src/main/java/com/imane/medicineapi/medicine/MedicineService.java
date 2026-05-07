package com.imane.medicineapi.medicine;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public List<MedicineResponse> findAll() {
        return medicineRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MedicineResponse findById(Long id) {
        Medicine medicine = getMedicineOrThrow(id);
        return toResponse(medicine);
    }

    public MedicineResponse create(MedicineRequest request) {
        Medicine medicine = new Medicine();
        medicine.setName(request.name());
        medicine.setDose(request.dose());
        medicine.setTime(request.time());
        medicine.setFrequency(request.frequency());
        medicine.setNotes(request.notes());

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
        return medicineRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Medicine not found with id: " + id
                ));
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

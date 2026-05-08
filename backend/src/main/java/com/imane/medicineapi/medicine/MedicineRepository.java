package com.imane.medicineapi.medicine;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findAllByUserEmail(String email);

    Optional<Medicine> findByIdAndUserEmail(Long id, String email);
}

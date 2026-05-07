package com.imane.medicineapi.medicine;

import java.time.LocalTime;

public record MedicineResponse(
        Long id,
        String name,
        String dose,
        LocalTime time,
        String frequency,
        String notes
) {
}

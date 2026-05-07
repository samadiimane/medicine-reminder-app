package com.imane.medicineapi.medicine;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record MedicineRequest(
        @NotBlank(message = "Medicine name is required")
        String name,

        String dose,

        @NotNull(message = "Medicine time is required")
        LocalTime time,

        @NotBlank(message = "Frequency is required")
        String frequency,

        String notes
) {
}

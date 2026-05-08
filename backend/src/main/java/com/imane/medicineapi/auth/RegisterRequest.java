package com.imane.medicineapi.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Full name is required")
        String fullName,

        @Email(message = "Email must be valid")
        @NotBlank(message = "Email is required")
        String email,

        @Size(min = 6, message = "Password must contain at least 6 characters")
        @NotBlank(message = "Password is required")
        String password
) {
}

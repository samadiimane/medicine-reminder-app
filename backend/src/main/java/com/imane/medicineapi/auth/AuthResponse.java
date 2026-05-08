package com.imane.medicineapi.auth;

public record AuthResponse(
        String token,
        Long userId,
        String fullName,
        String email
) {
}

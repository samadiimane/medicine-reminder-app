package com.imane.medicineapi.auth;

import com.imane.medicineapi.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (appUserRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already used");
        }

        AppUser appUser = new AppUser();
        appUser.setFullName(request.fullName());
        appUser.setEmail(request.email());
        appUser.setPassword(passwordEncoder.encode(request.password()));

        AppUser savedUser = appUserRepository.save(appUser);

        String token = jwtService.generateToken(
                User.builder()
                        .username(savedUser.getEmail())
                        .password(savedUser.getPassword())
                        .authorities("USER")
                        .build()
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        AppUser appUser = appUserRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String token = jwtService.generateToken(
                User.builder()
                        .username(appUser.getEmail())
                        .password(appUser.getPassword())
                        .authorities("USER")
                        .build()
        );

        return new AuthResponse(
                token,
                appUser.getId(),
                appUser.getFullName(),
                appUser.getEmail()
        );
    }
}

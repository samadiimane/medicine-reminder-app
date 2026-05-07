package com.imane.medicineapi.medicine;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @GetMapping
    public List<MedicineResponse> findAll() {
        return medicineService.findAll();
    }

    @GetMapping("/{id}")
    public MedicineResponse findById(@PathVariable Long id) {
        return medicineService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicineResponse create(@Valid @RequestBody MedicineRequest request) {
        return medicineService.create(request);
    }

    @PutMapping("/{id}")
    public MedicineResponse update(
            @PathVariable Long id,
            @Valid @RequestBody MedicineRequest request
    ) {
        return medicineService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        medicineService.delete(id);
    }
}

package com.imane.medicineapi.medicine;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String dose;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private String frequency;

    private String notes;
}

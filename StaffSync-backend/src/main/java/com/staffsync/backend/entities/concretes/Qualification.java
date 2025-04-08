package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "qualification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Qualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qualification_id")
    private int id;

    @Column(name = "name", nullable = false, unique = true, length = 255)
    private String name;
}

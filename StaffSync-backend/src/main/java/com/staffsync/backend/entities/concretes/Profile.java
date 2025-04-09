package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Entity
@Table(name = "profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private int id;

    @Column(name = "name", nullable = false, unique = true, length = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", nullable = true)
    private Department department;
}

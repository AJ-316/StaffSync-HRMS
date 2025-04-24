package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.*;

@ToString
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
    private Integer id;

    @Column(name = "name", nullable = false, unique = true, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "certificate", nullable = false)
    private Certificate certificate = Certificate.OTHER;

    @Column(name = "leave_reason", columnDefinition = "MEDIUMTEXT")
    private String leaveReason;

    @Column(name = "company", length = 45)
    private String company;

    public enum Certificate {
        TWELFTH,
        DIPLOMA,
        DEGREE,
        OTHER
    }
}

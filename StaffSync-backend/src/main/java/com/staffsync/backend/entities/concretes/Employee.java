package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@ToString
@Entity
@Table(name = "employee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private int employeeId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", unique = true, nullable = false)
    private User user;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.ACTIVE;

    @Column(name = "profiles", columnDefinition = "json")
    private String profiles;

    public enum Status {
        ACTIVE,
        RESIGNED,
        TERMINATED,
        RETIRED
    }
}

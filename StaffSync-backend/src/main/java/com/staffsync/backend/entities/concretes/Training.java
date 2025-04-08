package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "training")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_id")
    private int trainingId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "department_id", foreignKey = @ForeignKey(name = "fk_training_department",
            value = ConstraintMode.CONSTRAINT,
            foreignKeyDefinition = "FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL"))
    private Department department;
}

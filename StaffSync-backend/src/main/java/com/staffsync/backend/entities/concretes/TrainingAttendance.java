package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "training_attendance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainingAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "training_id", nullable = false, foreignKey = @ForeignKey(name = "fk_training_attendance_training",
            value = ConstraintMode.CONSTRAINT,
            foreignKeyDefinition = "FOREIGN KEY (training_id) REFERENCES training(training_id) ON DELETE CASCADE"))
    private Training training;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false, foreignKey = @ForeignKey(name = "fk_training_attendance_employee",
            value = ConstraintMode.CONSTRAINT,
            foreignKeyDefinition = "FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE"))
    private Employee employee;

    @Column(name = "attended", nullable = false)
    private boolean attended = false;
}

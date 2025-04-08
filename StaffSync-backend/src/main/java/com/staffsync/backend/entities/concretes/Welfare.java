package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "welfare")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Welfare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "welfare_id")
    private int welfareId;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false, foreignKey = @ForeignKey(name = "fk_welfare_employee",
            value = ConstraintMode.CONSTRAINT,
            foreignKeyDefinition = "FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE"))
    private Employee employee;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
}

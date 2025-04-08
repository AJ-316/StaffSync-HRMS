package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "salary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salary_id")
    private int salaryId;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_salary_employee",
                    value = ConstraintMode.CONSTRAINT,
                    foreignKeyDefinition = "FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE"))
    private Employee employee;

    @Column(name = "basic_salary", nullable = false)
    private double basicSalary;

    @Column(name = "hra", nullable = false)
    private double hra;

    @Column(name = "tax", nullable = false)
    private double tax;

    @Column(name = "deductions", nullable = false)
    private double deductions;

    public double getNetSalary() {
        return basicSalary + hra - tax - deductions; // Simulating stored generated column
    }
}

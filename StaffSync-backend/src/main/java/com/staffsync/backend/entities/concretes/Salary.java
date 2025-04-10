package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

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
    private int id;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "basic_salary", nullable = false)
    private BigDecimal basicSalary;

    @Column(name = "hra", nullable = false)
    private BigDecimal hra;

    @Column(name = "tax", nullable = false)
    private BigDecimal tax;

    @Column(name = "deductions", nullable = false)
    private BigDecimal deductions;

    @Column(name = "hra_salary", nullable = false)
    private BigDecimal hraSalary;

    @Column(name = "tax_salary", nullable = false)
    private BigDecimal taxSalary;

    @Column(name = "net_salary", nullable = false)
    private BigDecimal netSalary;
}

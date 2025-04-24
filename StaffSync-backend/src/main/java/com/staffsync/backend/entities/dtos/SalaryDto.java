package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.*;

import java.math.BigDecimal;
import java.util.Optional;

public record SalaryDto(
        Integer id,
        SimpleEmployeeDto employeeDto,
        BigDecimal basicSalary,
        BigDecimal hra,
        BigDecimal tax,
        BigDecimal deductions,
        BigDecimal hraSalary,
        BigDecimal taxSalary,
        BigDecimal netSalary
) implements Convertible<Salary> {

    public static SalaryDto fromEntity(Salary salary) {
        return new SalaryDto(
                salary.getId(),
                SimpleEmployeeDto.fromEntity(salary.getEmployee()),
                salary.getBasicSalary(),
                salary.getHra(),
                salary.getTax(),
                salary.getDeductions(),
                salary.getHraSalary(),
                salary.getTaxSalary(),
                salary.getNetSalary()
        );
    }

    @Override
    public Salary toEntity() {
        Salary salary = new Salary();
        Optional.ofNullable(id()).ifPresent(salary::setId);
        Optional.ofNullable(basicSalary()).ifPresent(salary::setBasicSalary);
        Optional.ofNullable(hra()).ifPresent(salary::setHra);
        Optional.ofNullable(tax()).ifPresent(salary::setTax);
        Optional.ofNullable(deductions()).ifPresent(salary::setDeductions);
        Optional.ofNullable(hraSalary()).ifPresent(salary::setHraSalary);
        Optional.ofNullable(taxSalary()).ifPresent(salary::setTaxSalary);
        Optional.ofNullable(netSalary()).ifPresent(salary::setNetSalary);
        return salary;
    }
}

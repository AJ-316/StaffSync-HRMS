package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.*;

import java.math.BigDecimal;

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
        salary.setId(id());
        salary.setBasicSalary(basicSalary);
        salary.setHra(hra());
        salary.setTax(tax());
        salary.setDeductions(deductions());
        salary.setHraSalary(hraSalary());
        salary.setTaxSalary(taxSalary());
        salary.setNetSalary(netSalary());
        return salary;
    }
}

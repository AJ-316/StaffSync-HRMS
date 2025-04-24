package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.entities.concretes.Welfare;

import java.util.Optional;

public record WelfareDto(
        Integer id,
        SimpleEmployeeDto employeeDto,
        String description
) implements Convertible<Welfare> {

    public static WelfareDto fromEntity(Welfare welfare) {
        return new WelfareDto(
                welfare.getWelfareId(),
                SimpleEmployeeDto.fromEntity(welfare.getEmployee()),
                welfare.getDescription()
        );
    }

    @Override
    public Welfare toEntity() {
        Employee employee = Optional.ofNullable(employeeDto)
                .map(SimpleEmployeeDto::toEntity)
                .orElse(null);

        Welfare welfare = new Welfare();
        Optional.ofNullable(id()).ifPresent(welfare::setWelfareId);
        Optional.ofNullable(employee).ifPresent(welfare::setEmployee);
        Optional.ofNullable(description()).ifPresent(welfare::setDescription);
        return welfare;
    }
}

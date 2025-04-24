package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;

import java.util.Optional;

public record SimpleEmployeeDto (
        Integer id,
        SimpleUserDto userDto
) implements Convertible<Employee> {

    public static SimpleEmployeeDto fromEntity(Employee employee) {
        return new SimpleEmployeeDto(
                employee.getEmployeeId(),
                SimpleUserDto.fromEntity(employee.getUser())
        );
    }

    @Override
    public Employee toEntity() {
        User user = Optional.ofNullable(userDto)
                .map(SimpleUserDto::toEntity)
                .orElse(null);

        Employee employee = new Employee();
        Optional.ofNullable(id()).ifPresent(employee::setEmployeeId);
        Optional.ofNullable(user).ifPresent(employee::setUser);
        return employee;
    }
}

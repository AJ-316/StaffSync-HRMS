package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;

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
        User user = userDto.toEntity();

        Employee employee = new Employee();
        employee.setEmployeeId(id());
        employee.setUser(user);
        return employee;
    }
}

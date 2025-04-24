package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;

import java.time.LocalDate;
import java.util.Optional;

public record EmployeeDto(
        Integer id,
        UserDto userDto,
        LocalDate joinDate,
        Employee.Status status
) implements Convertible<Employee> {

    public static EmployeeDto fromEntity(Employee employee) {
        return new EmployeeDto(
                employee.getEmployeeId(),
                UserDto.fromEntity(employee.getUser()),
                employee.getJoinDate(),
                employee.getStatus()
        );
    }

    @Override
    public Employee toEntity() {
        User user =  Optional.ofNullable(userDto)
                .map(UserDto::toEntity)
                .orElse(null);

        Employee employee = new Employee();
        Optional.ofNullable(id()).ifPresent(employee::setEmployeeId);
        Optional.ofNullable(user).ifPresent(employee::setUser);
        Optional.ofNullable(joinDate()).ifPresent(employee::setJoinDate);
        Optional.ofNullable(status()).ifPresent(employee::setStatus);
        return employee;
    }
}
/*public Employee update(Object... entities) {
        Employee employee = null;

        for (Object entity : entities) {
            if(entity instanceof Employee) {
                employee = (Employee) entity;

                User user = userDto().update(entities);
                if(user != null)
                    employee.setUser(user);

                employee.setStatus(status());
                employee.setProfiles(employee.getProfiles());
                employee.setJoinDate(employee.getJoinDate());
            }
        }
        return employee;
    }*/
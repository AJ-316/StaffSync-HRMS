package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;

import java.time.LocalDate;

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
        User user = userDto.toEntity();

        Employee employee = new Employee();
        employee.setEmployeeId(id());
        employee.setUser(user);
        employee.setJoinDate(joinDate());
        employee.setStatus(status());
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
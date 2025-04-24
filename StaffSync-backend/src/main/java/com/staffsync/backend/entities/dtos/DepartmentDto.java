package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Department;

import java.util.Optional;

public record DepartmentDto(
        Integer id,
        String name
) implements Convertible<Department> {

    public static DepartmentDto fromEntity(Department department) {
        if (department == null) {
            return null;
        }

        return new DepartmentDto(
                department.getId(),
                department.getName()
        );
    }

    @Override
    public Department toEntity() {
        Department department = new Department();
        Optional.ofNullable(id()).ifPresent(department::setId);
        Optional.ofNullable(name()).ifPresent(department::setName);
        return department;
    }
}

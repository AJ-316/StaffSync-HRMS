package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Department;

public record DepartmentDto(
        Integer id,
        String name
) implements Convertible<Department> {

    public static DepartmentDto fromEntity(Department department) {
        return new DepartmentDto(
                department.getId(),
                department.getName()
        );
    }

    @Override
    public Department toEntity() {
        Department department = new Department();
        department.setId(id());
        department.setName(name());
        return department;
    }
}

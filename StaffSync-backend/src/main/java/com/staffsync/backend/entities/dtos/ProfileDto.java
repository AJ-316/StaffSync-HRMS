package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Profile;

import java.util.Optional;

public record ProfileDto(
        Integer id,
        String name,
        DepartmentDto departmentDto
) implements Convertible<Profile> {

    @Override
    public Profile toEntity() {
        System.err.println("Calling department: " + departmentDto);
        Department department = Optional.ofNullable(departmentDto)
                .map(DepartmentDto::toEntity)
                .orElse(null);

        Profile profile = new Profile();
        Optional.ofNullable(id()).ifPresent(profile::setId);
        Optional.ofNullable(name()).ifPresent(profile::setName);
        Optional.ofNullable(department).ifPresent(profile::setDepartment);
        return profile;
    }

    public static ProfileDto fromEntity(Profile profile) {
        return new ProfileDto(
                profile.getId(),
                profile.getName(),
                DepartmentDto.fromEntity(profile.getDepartment())
        );
    }
}

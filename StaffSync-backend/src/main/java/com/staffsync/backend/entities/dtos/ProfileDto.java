package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Profile;

public record ProfileDto(
        Integer id,
        String name,
        DepartmentDto department
) implements Convertible<Profile> {

    @Override
    public Profile toEntity() {
        Profile profile = new Profile();
        profile.setId(id());
        profile.setName(name());
        profile.setDepartment(department().toEntity());
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

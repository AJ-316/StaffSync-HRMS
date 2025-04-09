package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.Qualification;
import com.staffsync.backend.entities.concretes.User;

import java.time.LocalDate;

public record UserDto(
        Integer id,
        String name,
        LocalDate dob,
        User.Gender gender,
        User.MaritalStatus maritalStatus,
        String addressTemp,
        String addressPerm,
        String email,
        String contactNumber,
        QualificationDto qualificationDto,
        ProfileDto profileDto
) implements Convertible<User> {


    public static UserDto fromEntity(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getDob(),
                user.getGender(),
                user.getMaritalStatus(),
                user.getAddressTemp(),
                user.getAddressPerm(),
                user.getEmail(),
                user.getContactNumber(),
                QualificationDto.fromEntity(user.getQualification()),
                ProfileDto.fromEntity(user.getProfile())
        );
    }

    public User update(Object... entities) {
        return null;
    }

    @Override
    public User toEntity() {
        Qualification qualificationE = qualificationDto().toEntity();
        Profile profileE = profileDto().toEntity();

        User user = new User();
        user.setId(id());
        user.setName(name());
        user.setDob(dob());
        user.setGender(gender());
        user.setMaritalStatus(maritalStatus());
        user.setAddressTemp(addressTemp());
        user.setAddressPerm(addressPerm());
        user.setEmail(email());
        user.setContactNumber(contactNumber());
        user.setQualification(qualificationE);
        user.setProfile(profileE);
        return user;
    }
}

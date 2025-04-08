package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.User;

import java.time.LocalDate;

public record UserDto(
        String name,
        LocalDate dob,
        User.Gender gender,
        User.MaritalStatus maritalStatus,
        String addressTemp,
        String addressPerm,
        String email,
        String contactNumber,
        QualificationDto qualification,
        ProfileDto profile
) implements Convertible<User> {


    public static UserDto fromEntity(User user) {
        return new UserDto(
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

    @Override
    public User toEntity() {
        User user = new User();
        user.setName(name());
        user.setDob(dob());
        user.setGender(gender());
        user.setMaritalStatus(maritalStatus());
        user.setAddressTemp(addressTemp());
        user.setAddressPerm(addressPerm());
        user.setEmail(email());
        user.setContactNumber(contactNumber());
        return user;
    }
}

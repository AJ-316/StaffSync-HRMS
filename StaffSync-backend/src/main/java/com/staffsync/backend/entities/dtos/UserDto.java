package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.Qualification;
import com.staffsync.backend.entities.concretes.User;

import java.time.LocalDate;
import java.util.Optional;

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

    /*public static UserDto copy(User user, User userCopy) {
        System.err.println(user.getQualification());
        return new UserDto(
                Optional.ofNullable(userCopy.getId()).orElse(user.getId()),
                Optional.ofNullable(userCopy.getName()).orElse(user.getName()),
                Optional.ofNullable(userCopy.getDob()).orElse(user.getDob()),
                Optional.ofNullable(userCopy.getGender()).orElse(user.getGender()),
                Optional.ofNullable(userCopy.getMaritalStatus()).orElse(user.getMaritalStatus()),
                Optional.ofNullable(userCopy.getAddressTemp()).orElse(user.getAddressTemp()),
                Optional.ofNullable(userCopy.getAddressPerm()).orElse(user.getAddressPerm()),
                Optional.ofNullable(userCopy.getEmail()).orElse(user.getEmail()),
                Optional.ofNullable(userCopy.getContactNumber()).orElse(user.getContactNumber()),
                QualificationDto.fromEntity(Optional.ofNullable(userCopy.getQualification()).orElse(user.getQualification())),
                ProfileDto.fromEntity(Optional.ofNullable(userCopy.getProfile()).orElse(user.getProfile()))
        );
    }*/

    @Override
    public User toEntity() {
        Qualification qualification = Optional.ofNullable(qualificationDto)
                .map(QualificationDto::toEntity)
                .orElse(null);
        Profile profile = Optional.ofNullable(profileDto)
                .map(ProfileDto::toEntity)
                .orElse(null);

        User user = new User();
        Optional.ofNullable(id()).ifPresent(user::setId);
        Optional.ofNullable(name()).ifPresent(user::setName);
        Optional.ofNullable(dob()).ifPresent(user::setDob);
        Optional.ofNullable(gender()).ifPresent(user::setGender);
        Optional.ofNullable(maritalStatus()).ifPresent(user::setMaritalStatus);
        Optional.ofNullable(addressTemp()).ifPresent(user::setAddressTemp);
        Optional.ofNullable(addressPerm()).ifPresent(user::setAddressPerm);
        Optional.ofNullable(email()).ifPresent(user::setEmail);
        Optional.ofNullable(contactNumber()).ifPresent(user::setContactNumber);
        Optional.ofNullable(qualification).ifPresent(user::setQualification);
        Optional.ofNullable(profile).ifPresent(user::setProfile);
        return user;
    }
}

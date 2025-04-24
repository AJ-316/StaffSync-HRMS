package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.User;

import java.util.Optional;

public record SimpleUserDto (
        Integer id,
        String name,
        User.Gender gender,
        ProfileDto profileDto
) implements Convertible<User> {

    public static SimpleUserDto fromEntity(User user) {
        return new SimpleUserDto(
                user.getId(),
                user.getName(),
                user.getGender(),
                ProfileDto.fromEntity(user.getProfile())
        );
    }

    @Override
    public User toEntity() {
        Profile profile = Optional.ofNullable(profileDto)
                .map(ProfileDto::toEntity)
                .orElse(null);

        User user = new User();
        Optional.ofNullable(id()).ifPresent(user::setId);
        Optional.ofNullable(name()).ifPresent(user::setName);
        Optional.ofNullable(gender()).ifPresent(user::setGender);
        Optional.ofNullable(profile).ifPresent(user::setProfile);
        return user;
    }
}
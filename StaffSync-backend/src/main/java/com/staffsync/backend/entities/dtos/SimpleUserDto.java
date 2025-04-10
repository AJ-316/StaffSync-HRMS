package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.User;

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
        Profile profileE = profileDto().toEntity();

        User user = new User();
        user.setId(id());
        user.setName(name());
        user.setGender(gender());
        user.setProfile(profileE);
        return user;
    }
}
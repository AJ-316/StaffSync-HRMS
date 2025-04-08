package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.entities.dtos.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User addUser(UserDto user);

    List<User> getAllUsers();

    Optional<User> getUserById(int userId);

    Optional<User> updateUser(int userId, UserDto user);

    void deleteUser(int userId);

    Optional<User> getUserByEmail(String email);

    List<User> getUsersByDepartment(DepartmentDto department);

    List<User> getUsersByProfile(Profile profile);

    Department getUserDepartment(int userId);

    Profile getUserProfile(int userId);
}

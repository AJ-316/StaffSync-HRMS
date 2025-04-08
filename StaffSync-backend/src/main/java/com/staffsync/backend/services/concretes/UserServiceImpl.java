package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.entities.dtos.UserDto;
import com.staffsync.backend.repositories.UserRepository;
import com.staffsync.backend.services.abstracts.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(UserDto user) {
        return userRepository.save(user.toEntity());
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> updateUser(int userId, UserDto userDro) {
        return userRepository.findById(userId).map(existingUser -> {
            User user = userDro.toEntity();

            existingUser.setName(user.getName());
            existingUser.setDob(user.getDob());
            existingUser.setGender(user.getGender());
            existingUser.setMaritalStatus(user.getMaritalStatus());
            existingUser.setAddressTemp(user.getAddressTemp());
            existingUser.setAddressPerm(user.getAddressPerm());
            existingUser.setEmail(user.getEmail());
            existingUser.setContactNumber(user.getContactNumber());
            existingUser.setProfile(user.getProfile());
            existingUser.setQualification(user.getQualification());
            existingUser.setResumePath(user.getResumePath());

            return userRepository.save(existingUser);
        });
    }

    @Override
    public void deleteUser(int userId) {
        if (!userRepository.existsById(userId))
            throw new EntityNotFoundException("User not found, ID: " + userId);

        userRepository.deleteById(userId);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getUsersByDepartment(DepartmentDto department) {
        return userRepository.findAllByProfileDepartment(department.toEntity());
    }

    @Override
    public List<User> getUsersByProfile(Profile profile) {
        return userRepository.findAllByProfile(profile);
    }

    @Override
    public Department getUserDepartment(int userId) {
        return userRepository.findDepartmentByUserId(userId);
    }

    @Override
    public Profile getUserProfile(int userId) {
        return userRepository.findProfileByUserId(userId);
    }
}

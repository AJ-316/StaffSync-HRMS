package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.entities.dtos.ProfileDto;
import com.staffsync.backend.repositories.DepartmentRepository;
import com.staffsync.backend.repositories.ProfileRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final DepartmentServiceImpl departmentService;

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository, DepartmentServiceImpl departmentService) {
        this.profileRepository = profileRepository;
        this.departmentService = departmentService;
    }

    @Override
    public Result addProfile(ProfileDto profileDto) {
        Profile profile = profileDto.toEntity();
        DataResult<DepartmentDto> departmentResult = departmentService.getDepartmentById(profileDto.departmentDto().id());

        if(departmentResult.getData().name() != null) {
            if (departmentResult.isSuccess()) {
                departmentService.updateDepartment(departmentResult.getData());
            } else {
                departmentService.addDepartment(departmentResult.getData());
            }
        } else {
            return new ErrorResult("Invalid Department[" + departmentResult.getData().id() + "," + departmentResult.getData().name() +
                    "] for Profile: id=" + profileDto.id() + ", name=" + profileDto.name());
        }

        profileRepository.save(profile);
        return new SuccessResult("Added Profile...");
    }

    @Override
    public Result updateProfile(ProfileDto profile) {
        if(profile.id() == null) return new ErrorResult("Cannot Update Profile; Null Profile.id");
        profileRepository.save(profile.toEntity());
        return new SuccessResult("Updated Profile...");
    }

    @Override
    public Result deleteProfile(int profileId) {
        if (!profileRepository.existsById(profileId))
            return new ErrorResult("Profile not found, ID: " + profileId);

        profileRepository.deleteById(profileId);
        return new SuccessResult("Deleted Profile...");
    }

    @Override
    public DataResult<ProfileDto> getProfileById(int profileId) {
        Optional<Profile> opt = profileRepository.findById(profileId);

        if(opt.isPresent()) {
            return new SuccessDataResult<>(ProfileDto.fromEntity(opt.get()), "Found Profile...");
        }

        return new ErrorDataResult<>("Could not find Profile");
    }

    @Override
    public DataResult<List<ProfileDto>> getAllProfiles() {
        return new SuccessDataResult<>(
                profileRepository.findAll()
                        .stream()
                        .map(ProfileDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}

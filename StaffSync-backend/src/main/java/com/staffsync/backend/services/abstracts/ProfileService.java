package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.entities.dtos.ProfileDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.time.LocalDate;
import java.util.List;

public interface ProfileService {

    Result addProfile(ProfileDto profile);

    Result updateProfile(ProfileDto profile);

    Result deleteProfile(int profileId);

    DataResult<ProfileDto> getProfileById(int profileId);

    DataResult<List<ProfileDto>> getAllProfiles();

}

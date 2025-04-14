package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.ProfileDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;
import com.staffsync.backend.services.abstracts.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/getall")
    public DataResult<List<ProfileDto>> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    @GetMapping("/getbyid")
    public DataResult<ProfileDto> getProfileById(@RequestParam int id) {
        return profileService.getProfileById(id);
    }

    @PostMapping("/update")
    public Result updateProfile(@RequestBody ProfileDto profileDto) {
        return profileService.updateProfile(profileDto);
    }

    @PostMapping("/add")
    public Result addProfile(@RequestBody ProfileDto profileDto) {
        return profileService.addProfile(profileDto);
    }

    @PostMapping("/delete")
    public Result deleteProfile(@RequestBody int id) {
        return profileService.deleteProfile(id);
    }
}

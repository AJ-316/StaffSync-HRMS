package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Candidate;
import com.staffsync.backend.entities.concretes.Qualification;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.entities.dtos.CandidateDto;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.entities.dtos.UserDto;
import com.staffsync.backend.repositories.CandidateRepository;
import com.staffsync.backend.repositories.QualificationRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.CandidateService;
import com.staffsync.backend.services.abstracts.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;
    private final UserService userService;

    @Autowired
    public CandidateServiceImpl(CandidateRepository candidateRepository, UserService userService) {
        this.candidateRepository = candidateRepository;
        this.userService = userService;
    }

    @Override
    public Result addCandidate(CandidateDto candidateDto) {
        Candidate candidate = candidateDto.toEntity();

        DataResult<User> userDataResult = userService.addUser(UserDto.fromEntity(candidate.getUser()));

        if(!userDataResult.isSuccess()) {
            return userDataResult;
        }

        candidate.setUser(userDataResult.getData());

        candidateRepository.save(candidate);
        return new SuccessResult("Added Candidate...");
    }

    @Override
    public Result updateCandidate(CandidateDto candidateDto) {
        Candidate candidate = candidateDto.toEntity();
        Optional<User> userOptional = userService.getUserById(candidate.getUser().getId());
        if(userOptional.isEmpty()) {
            return new ErrorResult("Cannot Update Candidate: Invalid User ID");
        }
        System.err.println("@0");
        Optional<User> updatedUser = userService.updateUser(userOptional.get().getId(), UserDto.fromEntity(userOptional.get()));
        System.err.println("@1");
        if(updatedUser.isEmpty()) {
            return new ErrorResult("Cannot Update Candidate: Cannot save User");
        }
        System.err.println("@2");
        candidate.setUser(updatedUser.get());
        System.err.println("@3");
        candidateRepository.save(candidate);
        System.err.println("@4");
        return new SuccessResult("Updated Candidate...");
    }

    @Override
    public DataResult<CandidateDto> getCandidateById(int candidateId) {
        Optional<Candidate> opt = candidateRepository.findById(candidateId);
        if(opt.isPresent()) {
            return new SuccessDataResult<>(CandidateDto.fromEntity(opt.get()), "Found Candidate...");
        }

        return new ErrorDataResult<>("Could not find Candidate");
    }

    @Override
    public DataResult<Candidate.Status> getCandidateStatus(int candidateId) {
        Optional<Candidate> opt = candidateRepository.findById(candidateId);
        if(opt.isPresent()) {
            return new SuccessDataResult<>(opt.get().getStatus(), "Found Candidate Status...");
        }

        return new ErrorDataResult<>("Could not find Candidate Status");
    }

    @Override
    public Result deleteCandidate(int candidateId) {
        if (!candidateRepository.existsById(candidateId))
            return new ErrorResult("User not found, ID: " + candidateId);

        candidateRepository.deleteById(candidateId);
        return new SuccessResult("Candidate deleted... ");
    }

    @Override
    public DataResult<List<CandidateDto>> getAllCandidates() {
        return new SuccessDataResult<>(
                candidateRepository.findAll()
                        .stream()
                        .map(CandidateDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}

package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Candidate;
import com.staffsync.backend.entities.dtos.CandidateDto;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.entities.dtos.UserDto;
import com.staffsync.backend.repositories.CandidateRepository;
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
    public Result addCandidate(CandidateDto candidate) {
        candidateRepository.save(candidate.toEntity());
        return new SuccessResult("Added Candidate...");
    }

    @Override
    public Result updateCandidate(CandidateDto candidate) {
        UserDto user = candidate.userDto();
        userService.updateUser(user.id(), user);

        candidateRepository.save(candidate.toEntity());
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

package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Candidate;
import com.staffsync.backend.entities.dtos.CandidateDto;
import com.staffsync.backend.repositories.CandidateRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;

    @Autowired
    public CandidateServiceImpl(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    @Override
    public Result addCandidate(CandidateDto candidate) {
        Candidate emp = candidateRepository.save(candidate.toEntity());
        return new SuccessResult("Added Candidate...");
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

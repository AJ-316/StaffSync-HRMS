package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Candidate;
import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.services.abstracts.CandidateService;

import java.time.LocalDate;

public record CandidateDto(
        Integer id,
        UserDto userDto,
        Candidate.Status status,
        Candidate.InterviewStage interviewStage,
        String rejectionReason
) implements Convertible<Candidate> {

    public static CandidateDto fromEntity(Candidate candidate) {
        return new CandidateDto(
                candidate.getCandidateId(),
                UserDto.fromEntity(candidate.getUser()),
                candidate.getStatus(),
                candidate.getInterviewStage(),
                candidate.getRejectionReason()
        );
    }

    @Override
    public Candidate toEntity() {
        User user = userDto.toEntity();

        Candidate candidate = new Candidate();
        candidate.setCandidateId(id());
        candidate.setUser(user);
        candidate.setStatus(status());
        candidate.setInterviewStage(interviewStage());
        candidate.setRejectionReason(rejectionReason());
        return candidate;
    }
}
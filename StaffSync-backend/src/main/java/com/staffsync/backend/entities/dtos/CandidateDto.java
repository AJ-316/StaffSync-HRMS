package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Attendance;
import com.staffsync.backend.entities.concretes.Candidate;
import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.services.abstracts.CandidateService;

import java.time.LocalDate;
import java.util.Optional;

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

    /*public Candidate update(Object... entities) {
        return null;
    }*/

    @Override
    public Candidate toEntity() {
        User user =  Optional.ofNullable(userDto())
                .map(UserDto::toEntity)
                .orElse(null);

        Candidate candidate = new Candidate();
        Optional.ofNullable(id()).ifPresent(candidate::setCandidateId);
        Optional.ofNullable(user).ifPresent(candidate::setUser);
        Optional.ofNullable(status()).ifPresent(candidate::setStatus);
        Optional.ofNullable(interviewStage()).ifPresent(candidate::setInterviewStage);
        Optional.ofNullable(rejectionReason()).ifPresent(candidate::setRejectionReason);
        return candidate;
    }
}
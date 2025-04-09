package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.concretes.Candidate;
import com.staffsync.backend.entities.dtos.CandidateDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.util.List;

public interface CandidateService {

    Result addCandidate(CandidateDto candidate);

    Result updateCandidate(CandidateDto candidate);

    Result deleteCandidate(int candidateId);

    DataResult<CandidateDto> getCandidateById(int candidateId);

    DataResult<Candidate.Status> getCandidateStatus(int candidateId);

    DataResult<List<CandidateDto>> getAllCandidates();
}

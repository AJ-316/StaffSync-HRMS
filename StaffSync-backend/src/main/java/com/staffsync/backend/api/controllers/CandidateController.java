package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.CandidateDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.services.abstracts.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    private final CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/getall")
    public DataResult<List<CandidateDto>> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @GetMapping("/getbyid")
    public DataResult<CandidateDto> getCandidateById(@RequestParam int id) {
        return candidateService.getCandidateById(id);
    }
}

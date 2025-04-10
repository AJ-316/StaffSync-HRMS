package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.SalaryDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;
import com.staffsync.backend.services.abstracts.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee/salary")
public class SalaryController {

    private final SalaryService salaryService;

    @Autowired
    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @GetMapping("/getall")
    public DataResult<List<SalaryDto>> getAllSalaries() {
        return salaryService.getAllSalaries();
    }

    @GetMapping("/getbyid")
    public DataResult<SalaryDto> getSalaryByEmployeeId(@RequestParam int id) {
        return salaryService.getSalaryByEmployeeId(id);
    }

    @PostMapping("/update")
    public Result updateSalary(@RequestBody SalaryDto salaryDto) {
        return salaryService.updateSalary(salaryDto);
    }

}

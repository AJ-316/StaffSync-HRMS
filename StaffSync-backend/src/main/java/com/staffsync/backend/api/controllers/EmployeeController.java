package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;
import com.staffsync.backend.services.abstracts.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/getall")
    public DataResult<List<EmployeeDto>> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/getbyid")
    public DataResult<EmployeeDto> getEmployeeById(@RequestParam int id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping("/update")
    public Result updateEmployee(@RequestBody EmployeeDto employeeDto) {
        System.err.println(employeeDto.toEntity());
        return employeeService.updateEmployee(employeeDto);
    }
}

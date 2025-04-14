package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;
import com.staffsync.backend.services.abstracts.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping("/getall")
    public DataResult<List<DepartmentDto>> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/getbyid")
    public DataResult<DepartmentDto> getDepartmentById(@RequestParam int id) {
        return departmentService.getDepartmentById(id);
    }

    @PostMapping("/update")
    public Result updateDepartment(@RequestBody DepartmentDto departmentDto) {
        return departmentService.updateDepartment(departmentDto);
    }

    @PostMapping("/add")
    public Result addDepartment(@RequestBody DepartmentDto departmentDto) {
        return departmentService.addDepartment(departmentDto);
    }

    @PostMapping("/delete")
    public Result deleteDepartment(@RequestBody int id) {
        return departmentService.deleteDepartment(id);
    }
}

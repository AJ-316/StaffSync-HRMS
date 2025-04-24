package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.AttendanceDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;
import com.staffsync.backend.services.abstracts.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/getall")
    public DataResult<List<AttendanceDto>> getAllAttendances() {
        return attendanceService.getAllAttendances();
    }

    @GetMapping("/getbyid")
    public DataResult<AttendanceDto> getAttendanceById(@RequestParam int id) {
        return attendanceService.getAttendanceById(id);
    }

    @PostMapping("/add")
    public Result addAttendance(@RequestBody AttendanceDto departmentDto) {
        return attendanceService.addAttendance(departmentDto);
    }

}

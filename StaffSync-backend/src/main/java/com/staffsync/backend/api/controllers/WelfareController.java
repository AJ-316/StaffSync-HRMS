package com.staffsync.backend.api.controllers;

import com.staffsync.backend.entities.dtos.WelfareDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;
import com.staffsync.backend.services.abstracts.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/welfare")
public class WelfareController {

    private final WelfareService welfareService;

    @Autowired
    public WelfareController(WelfareService welfareService) {
        this.welfareService = welfareService;
    }

    @GetMapping("/getall")
    public DataResult<List<WelfareDto>> getAllWelfare() {
        return welfareService.getAllWelfare();
    }

    @GetMapping("/getbyid")
    public DataResult<WelfareDto> getWelfareById(@RequestParam int id) {
        return welfareService.getWelfareById(id);
    }

    @GetMapping("/getbyemployeeid")
    public DataResult<List<WelfareDto>> getWelfareByEmployeeId(@RequestParam int id) {
        return welfareService.getWelfareByEmployeeId(id);
    }

    @PostMapping("/add")
    public Result addWelfare(@RequestBody WelfareDto departmentDto) {
        return welfareService.addWelfare(departmentDto);
    }

}

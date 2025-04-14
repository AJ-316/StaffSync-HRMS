package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.util.List;

public interface DepartmentService {

    Result addDepartment(DepartmentDto department);

    Result updateDepartment(DepartmentDto department);

    Result deleteDepartment(int departmentId);

    DataResult<DepartmentDto> getDepartmentById(int departmentId);

    DataResult<List<DepartmentDto>> getAllDepartments();

}

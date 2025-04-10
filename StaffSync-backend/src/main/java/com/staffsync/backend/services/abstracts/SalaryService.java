package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.concretes.Salary;
import com.staffsync.backend.entities.dtos.SalaryDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.util.List;

public interface SalaryService {

    Result updateSalary(SalaryDto salaryDto);
    DataResult<List<SalaryDto>> getAllSalaries();
    DataResult<SalaryDto> getSalaryByEmployeeId(int employeeId);
}

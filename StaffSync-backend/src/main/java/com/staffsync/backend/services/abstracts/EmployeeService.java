package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    Result addEmployee(EmployeeDto employee);

    Result deleteEmployee(int employeeId);

    DataResult<EmployeeDto> getEmployeeById(int employeeId);

    DataResult<Employee.Status> getEmployeeStatus(int employeeId);

    DataResult<List<EmployeeDto>> getEmployeeByJoinDate(LocalDate joinDate);

    DataResult<List<EmployeeDto>> getAllEmployees();
}

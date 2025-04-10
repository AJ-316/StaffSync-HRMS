package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.Salary;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.entities.dtos.SalaryDto;
import com.staffsync.backend.entities.dtos.UserDto;
import com.staffsync.backend.repositories.SalaryRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.EmployeeService;
import com.staffsync.backend.services.abstracts.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SalaryServiceImpl implements SalaryService {

    private final SalaryRepository salaryRepository;
    private final EmployeeService employeeService;

    @Autowired
    public SalaryServiceImpl(SalaryRepository salaryRepository, EmployeeService employeeService) {
        this.salaryRepository = salaryRepository;
        this.employeeService = employeeService;
    }

    public Result updateSalary(SalaryDto salaryDto) {
        DataResult<EmployeeDto> employeeDto = employeeService.getEmployeeById(salaryDto.employeeDto().id());
        if(!employeeDto.isSuccess()) {
            return new ErrorResult("Salary has a reference to invalid Employee...");
        }

        Employee emp = employeeDto.getData().toEntity();
        Salary salary = salaryDto.toEntity();
        salary.setEmployee(emp);
        salaryRepository.save(salary);

        return new SuccessResult("Updated Salary...");
    }

    public DataResult<List<SalaryDto>> getAllSalaries() {
        return new SuccessDataResult<>(
                salaryRepository.findAll()
                        .stream()
                        .map(SalaryDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }

    @Override
    public DataResult<SalaryDto> getSalaryByEmployeeId(int employeeId) {
        Optional<Salary> opt = salaryRepository.findByEmployeeId(employeeId);

        if(opt.isPresent()) {
            System.out.println(opt.get());
            return new SuccessDataResult<>(SalaryDto.fromEntity(opt.get()), "Found Salary...");
        }

        return new ErrorDataResult<>("Could not find Salary by Employee");
    }
}

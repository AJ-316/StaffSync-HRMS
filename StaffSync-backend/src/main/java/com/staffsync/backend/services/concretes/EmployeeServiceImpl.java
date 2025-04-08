package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.repositories.EmployeeRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Result addEmployee(EmployeeDto employee) {
        Employee emp = employeeRepository.save(employee.toEntity());
        return new SuccessResult("Added Employee...");
    }

    @Override
    public DataResult<EmployeeDto> getEmployeeById(int employeeId) {
        Optional<Employee> opt = employeeRepository.findById(employeeId);
        if(opt.isPresent()) {
            return new SuccessDataResult<>(EmployeeDto.fromEntity(opt.get()), "Found Employee...");
        }

        return new ErrorDataResult<>("Could not find Employee");
    }

    @Override
    public DataResult<Employee.Status> getEmployeeStatus(int employeeId) {
        Optional<Employee> opt = employeeRepository.findById(employeeId);
        if(opt.isPresent()) {
            return new SuccessDataResult<>(opt.get().getStatus(), "Found Employee Status...");
        }

        return new ErrorDataResult<>("Could not find Employee Status");
    }

    @Override
    public Result deleteEmployee(int employeeId) {
        if (!employeeRepository.existsById(employeeId))
            return new ErrorResult("User not found, ID: " + employeeId);

        employeeRepository.deleteById(employeeId);
        return new SuccessResult("Employee deleted... ");
    }

    @Override
    public DataResult<List<EmployeeDto>> getEmployeeByJoinDate(LocalDate joinDate) {
        return new SuccessDataResult<>(employeeRepository.findAllByJoinDate(joinDate)
                .stream()
                .map(EmployeeDto::fromEntity)
                .collect(Collectors.toList())
        );
    }

    @Override
    public DataResult<List<EmployeeDto>> getAllEmployees() {
        return new SuccessDataResult<>(
                employeeRepository.findAll()
                        .stream()
                        .map(EmployeeDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}

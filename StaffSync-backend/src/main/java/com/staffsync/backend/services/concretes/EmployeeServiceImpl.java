package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Employee;
import com.staffsync.backend.entities.concretes.User;
import com.staffsync.backend.entities.dtos.EmployeeDto;
import com.staffsync.backend.entities.dtos.UserDto;
import com.staffsync.backend.repositories.EmployeeRepository;
import com.staffsync.backend.repositories.UserRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.EmployeeService;
import com.staffsync.backend.services.abstracts.UserService;
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
    private final UserService userService;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, UserService userService) {
        this.userService = userService;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Result addEmployee(EmployeeDto employee) {
        employeeRepository.save(employee.toEntity());
        return new SuccessResult("Added Employee...");
    }
    /*public Result updateEmployee(EmployeeDto employeeDto) {
            // Fetch existing employee
            Employee existingEmployee = employeeRepository.findById(employeeDto.id())
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            // Update only changed fields in employee
            if (!existingEmployee.getDesignation().equals(employeeDto.designation())) {
                existingEmployee.setDesignation(employeeDto.designation());
            }
            if (!existingEmployee.getDepartment().getDepartmentId().equals(employeeDto.departmentDto().departmentId())) {
                Department dept = departmentRepository.findById(employeeDto.departmentDto().departmentId())
                        .orElseThrow(() -> new RuntimeException("Department not found"));
                existingEmployee.setDepartment(dept);
            }

            // Handle User update
            UserDto userDto = employeeDto.userDto();
            User user = userRepository.findById(userDto.id())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean userUpdated = false;

            if (!user.getFirstName().equals(userDto.firstName())) {
                user.setFirstName(userDto.firstName());
                userUpdated = true;
            }
            if (!user.getLastName().equals(userDto.lastName())) {
                user.setLastName(userDto.lastName());
                userUpdated = true;
            }
            if (!user.getEmail().equals(userDto.email())) {
                user.setEmail(userDto.email());
                userUpdated = true;
            }

            // Add other user fields you care about here...

            // Save changes
            if (userUpdated) {
                userRepository.save(user);
            }

            employeeRepository.save(existingEmployee);

            return new SuccessResult("Employee updated successfully (only changed fields)");
        }*/
    @Override
    public Result updateEmployee(EmployeeDto employee) {
        UserDto user = employee.userDto();
        userService.updateUser(user.id(), user);

        employeeRepository.save(employee.toEntity());
        return new SuccessResult("Updated Employee...");
    }

    @Override
    public DataResult<EmployeeDto> getEmployeeById(int employeeId) {
        Optional<Employee> opt = employeeRepository.findById(employeeId);

        if(opt.isPresent()) {
            System.out.println(opt.get());
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

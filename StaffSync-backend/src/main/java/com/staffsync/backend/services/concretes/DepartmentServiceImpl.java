package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.entities.dtos.ProfileDto;
import com.staffsync.backend.repositories.DepartmentRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public Result addDepartment(DepartmentDto departmentDto) {
        Department department = departmentDto.toEntity();
        departmentRepository.save(department);
        return new SuccessResult("Added Department...");
    }

    @Override
    public Result updateDepartment(DepartmentDto department) {
        if(department.id() == null) return new ErrorResult("Cannot Update Department; Null Department.id");
        departmentRepository.save(department.toEntity());
        return new SuccessResult("Updated Department...");
    }

    @Override
    public Result deleteDepartment(int departmentId) {
        if (!departmentRepository.existsById(departmentId))
            return new ErrorResult("Department not found, ID: " + departmentId);

        departmentRepository.deleteById(departmentId);
        return new SuccessResult("Deleted Department...");
    }

    @Override
    public DataResult<DepartmentDto> getDepartmentById(int departmentId) {
        Optional<Department> opt = departmentRepository.findById(departmentId);

        if(opt.isPresent()) {
            return new SuccessDataResult<>(DepartmentDto.fromEntity(opt.get()), "Found Department...");
        }

        return new ErrorDataResult<>("Could not find Department");
    }

    @Override
    public DataResult<List<DepartmentDto>> getAllDepartments() {
        return new SuccessDataResult<>(
                departmentRepository.findAll()
                        .stream()
                        .map(DepartmentDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}

package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Attendance;
import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.dtos.AttendanceDto;
import com.staffsync.backend.entities.dtos.DepartmentDto;
import com.staffsync.backend.repositories.AttendanceRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    @Autowired
    public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public Result addAttendance(AttendanceDto attendanceDto) {
        Attendance attendance = attendanceDto.toEntity();
        attendanceRepository.save(attendance);
        return new SuccessResult("Added Attendance...");
    }

    @Override
    public DataResult<List<AttendanceDto>> getAttendancesByMonth(LocalDate date) {
        return new SuccessDataResult<>(
                attendanceRepository.findByMonth(date)
                        .stream()
                        .map(AttendanceDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }

    @Override
    public DataResult<AttendanceDto> getAttendanceById(int attendanceId) {
        Optional<Attendance> opt = attendanceRepository.findById(attendanceId);

        if(opt.isPresent()) {
            return new SuccessDataResult<>(AttendanceDto.fromEntity(opt.get()), "Found Attendance...");
        }

        return new ErrorDataResult<>("Could not find Attendance");
    }

    @Override
    public DataResult<List<AttendanceDto>> getAllAttendances() {
        return new SuccessDataResult<>(
                attendanceRepository.findAll()
                        .stream()
                        .map(AttendanceDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}

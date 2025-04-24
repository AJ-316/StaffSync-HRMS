package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Attendance;
import com.staffsync.backend.entities.concretes.Employee;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

public record AttendanceDto(
    Integer id,
    SimpleEmployeeDto employeeDto,
    LocalDate date,
    LocalTime timeIn,
    LocalTime timeOut,
    Attendance.Status status
) implements Convertible<Attendance> {

    public static AttendanceDto fromEntity(Attendance attendance) {
        return new AttendanceDto(
                attendance.getAttendanceId(),
                SimpleEmployeeDto.fromEntity(attendance.getEmployee()),
                attendance.getDate(),
                attendance.getTimeIn(),
                attendance.getTimeOut(),
                attendance.getStatus()
        );
    }

    @Override
    public Attendance toEntity() {
        Employee employee = Optional.ofNullable(employeeDto)
                .map(SimpleEmployeeDto::toEntity)
                .orElse(null);

        Attendance attendance = new Attendance();
        Optional.ofNullable(id()).ifPresent(attendance::setAttendanceId);
        Optional.ofNullable(employee).ifPresent(attendance::setEmployee);
        Optional.ofNullable(timeIn()).ifPresent(attendance::setTimeIn);
        Optional.ofNullable(timeOut()).ifPresent(attendance::setTimeOut);
        Optional.ofNullable(date()).ifPresent(attendance::setDate);
        Optional.ofNullable(status()).ifPresent(attendance::setStatus);
        return attendance;
    }
}

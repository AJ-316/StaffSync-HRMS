package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.dtos.AttendanceDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    Result addAttendance(AttendanceDto attendance);

    // Result updateAttendance(AttendanceDto attendance);

    // Result deleteAttendance(int attendanceId);

    DataResult<List<AttendanceDto>> getAttendancesByMonth(LocalDate month);

    DataResult<AttendanceDto> getAttendanceById(int attendanceId);

    DataResult<List<AttendanceDto>> getAllAttendances();

}

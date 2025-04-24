package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    @Query("SELECT a FROM Attendance a WHERE MONTH(a.date) = MONTH(:date) AND YEAR(a.date) = YEAR(:date)")
    List<Attendance> findByMonth(@Param("date") LocalDate date);

}

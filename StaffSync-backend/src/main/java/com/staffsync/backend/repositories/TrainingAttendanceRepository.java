package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.TrainingAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingAttendanceRepository extends JpaRepository<TrainingAttendance, Integer> {
}

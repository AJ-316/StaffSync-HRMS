package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.LeaveTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveTrackingRepository extends JpaRepository<LeaveTracking, Integer> {
}

package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Integer> {
}

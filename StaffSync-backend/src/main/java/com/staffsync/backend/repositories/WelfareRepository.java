package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WelfareRepository extends JpaRepository<Welfare, Integer> {
}

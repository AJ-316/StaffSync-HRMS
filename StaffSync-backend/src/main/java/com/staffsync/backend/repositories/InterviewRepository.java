package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Integer> {
}

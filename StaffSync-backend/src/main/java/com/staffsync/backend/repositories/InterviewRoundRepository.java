package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.InterviewRound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewRoundRepository extends JpaRepository<InterviewRound, Integer> {
}

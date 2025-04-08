package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Integer> {
}

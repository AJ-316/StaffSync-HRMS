package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
}

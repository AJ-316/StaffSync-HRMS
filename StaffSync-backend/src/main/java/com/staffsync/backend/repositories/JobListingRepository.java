package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Integer> {
}

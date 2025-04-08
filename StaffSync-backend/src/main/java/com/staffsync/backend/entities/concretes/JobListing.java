package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_listing")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private int jobId;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", nullable = true)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "profile_id", referencedColumnName = "profile_id", nullable = true)
    private Profile profile;

    @Column(name = "job_description", nullable = false, columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "candidate_count", nullable = false)
    private int candidateCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}

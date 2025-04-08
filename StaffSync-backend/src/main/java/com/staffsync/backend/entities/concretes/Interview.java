package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "interview")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_id")
    private int interviewId;

    @OneToOne
    @JoinColumn(name = "candidate_id", unique = true, nullable = false,
            foreignKey = @ForeignKey(name = "fk_interview_candidate",
                    value = ConstraintMode.CONSTRAINT,
                    foreignKeyDefinition = "FOREIGN KEY (candidate_id) REFERENCES candidate(candidate_id) ON DELETE CASCADE"))
    private Candidate candidate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.PENDING;

    public enum Status {
        PENDING, IN_PROGRESS, COMPLETED
    }
}

package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_round")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRound {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "round_id")
    private int roundId;

    @ManyToOne
    @JoinColumn(name = "interview_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_interview_round_interview",
                    value = ConstraintMode.CONSTRAINT,
                    foreignKeyDefinition = "FOREIGN KEY (interview_id) REFERENCES interview(interview_id) ON DELETE CASCADE"))
    private Interview interview;

    @Column(name = "round_number", nullable = false)
    private int roundNumber;

    @Column(name = "interviewer")
    private String interviewer;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.PENDING;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        PENDING, PASSED, REJECTED
    }
}

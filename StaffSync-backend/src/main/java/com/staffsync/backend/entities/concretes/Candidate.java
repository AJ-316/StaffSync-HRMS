package com.staffsync.backend.entities.concretes;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "candidate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "candidate_id")
    private Integer candidateId;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, foreignKey = @ForeignKey(name = "fk_candidate_user", value = ConstraintMode.CONSTRAINT, foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE"))
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.APPLIED;

    @Enumerated(EnumType.STRING)
    @Column(name = "interview_stage")
    private InterviewStage interviewStage = InterviewStage.NOT_INITIATED;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    public enum Status {
        APPLIED, SHORTLISTED, REJECTED, SELECTED
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public enum InterviewStage {
        NOT_INITIATED, ROUND_1, ROUND_2, FINAL
    }
}

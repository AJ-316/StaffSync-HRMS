package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "leave_tracking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private int leaveId;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_leave_tracking_employee",
                    value = ConstraintMode.CONSTRAINT,
                    foreignKeyDefinition = "FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE"))
    private Employee employee;

    @Column(name = "total_leaves", nullable = false)
    private int totalLeaves;

    @Column(name = "leaves_taken", nullable = false)
    private int leavesTaken = 0;

    @Column(name = "present_days", nullable = false)
    private int presentDays = 0;

    public int getRemainingLeaves() {
        return totalLeaves - leavesTaken; // Simulating stored generated column
    }
}

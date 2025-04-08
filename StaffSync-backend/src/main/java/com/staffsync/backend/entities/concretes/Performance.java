package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "performance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "performance_id")
    private int performanceId;

    @OneToOne
    @JoinColumn(name = "employee_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_performance_employee",
                    value = ConstraintMode.CONSTRAINT,
                    foreignKeyDefinition = "FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE"))
    private Employee employee;

    @Column(name = "kpi_score")
    private double kpiScore;

    @Column(name = "total_training_attendance", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalTrainingAttendance;

    @Column(name = "total_attendance_performance", nullable = false, columnDefinition = "DECIMAL(5,2) DEFAULT 0")
    private double totalAttendancePerformance;
}

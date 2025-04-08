package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "asset")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private int assetId;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false, foreignKey = @ForeignKey(name = "fk_asset_employee",
            value = ConstraintMode.CONSTRAINT,
            foreignKeyDefinition = "FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE"))
    private Employee employee;

    @Column(name = "asset_name", nullable = false, length = 255)
    private String assetName;

    @Column(name = "assigned_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date assignedDate;

    @Column(name = "returned_date")
    @Temporal(TemporalType.DATE)
    private Date returnedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.ASSIGNED;

    public enum Status {
        ASSIGNED,
        RETURNED
    }
}

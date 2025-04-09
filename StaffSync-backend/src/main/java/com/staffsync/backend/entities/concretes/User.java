package com.staffsync.backend.entities.concretes;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@ToString
@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('Male', 'Female', 'Other')")
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "marital_status", columnDefinition = "ENUM('Single', 'Married', 'Divorced', 'Widowed')")
    private MaritalStatus maritalStatus;

    @Column(name = "address_temp", columnDefinition = "TEXT")
    private String addressTemp;

    @Column(name = "address_perm", columnDefinition = "TEXT")
    private String addressPerm;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "contact_number", nullable = false, unique = true, length = 20)
    private String contactNumber;

    @ManyToOne
    @JoinColumn(name = "profile_id", foreignKey = @ForeignKey(name = "fk_user_profile"))
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "qualification_id", foreignKey = @ForeignKey(name = "fk_user_qualification"))
    private Qualification qualification;

    @Column(name = "resume_path", columnDefinition = "TEXT")
    private String resumePath;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum MaritalStatus {
        SINGLE, MARRIED, DIVORCED, WIDOWED
    }
}

package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Department;
import com.staffsync.backend.entities.concretes.Profile;
import com.staffsync.backend.entities.concretes.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    List<User> findAllByProfile(Profile profile);

    @Query("SELECT u FROM User u JOIN u.profile p WHERE p.department = :department")
    List<User> findAllByProfileDepartment(@Param("department") Department department);

    @Query("SELECT p.department FROM User u JOIN u.profile p WHERE u.id = :userId")
    Department findDepartmentByUserId(@Param("userId") int userId);

    @Query("SELECT u.profile FROM User u WHERE u.id = :userId")
    Profile findProfileByUserId(@Param("userId") int userId);
}

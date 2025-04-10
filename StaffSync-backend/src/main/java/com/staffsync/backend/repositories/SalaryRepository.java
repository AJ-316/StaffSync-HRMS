package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Integer> {

    @Query("SELECT s FROM Salary s WHERE s.employee.employeeId = :employeeId")
    Optional<Salary> findByEmployeeId(int employeeId);

}

package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    List<Employee> findAllByJoinDate(LocalDate joinDate);

}

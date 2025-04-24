package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WelfareRepository extends JpaRepository<Welfare, Integer> {

    @Query("SELECT w FROM Welfare w WHERE w.employee.id = :id")
    List<Welfare> findAllByEmployeeId(@Param("id") int id);
}
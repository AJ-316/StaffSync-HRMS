package com.staffsync.backend.repositories;

import com.staffsync.backend.entities.concretes.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer> {
}

package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Qualification;

import java.util.Optional;

public record QualificationDto(
        Integer id,
        String name,
        String company,
        String leaveReason,
        Qualification.Certificate certificate
) implements Convertible<Qualification> {

    public static QualificationDto fromEntity(Qualification qualification) {
        return new QualificationDto(
                qualification.getId(),
                qualification.getName(),
                qualification.getCompany(),
                qualification.getLeaveReason(),
                qualification.getCertificate()
        );
    }

    @Override
    public Qualification toEntity() {
        Qualification qualification = new Qualification();
        Optional.ofNullable(id()).ifPresent(qualification::setId);
        Optional.ofNullable(name()).ifPresent(qualification::setName);
        Optional.ofNullable(company()).ifPresent(qualification::setCompany);
        Optional.ofNullable(leaveReason()).ifPresent(qualification::setLeaveReason);
        Optional.ofNullable(certificate()).ifPresent(qualification::setCertificate);
        return qualification;
    }
}

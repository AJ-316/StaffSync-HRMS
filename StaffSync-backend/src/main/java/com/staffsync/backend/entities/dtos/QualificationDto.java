package com.staffsync.backend.entities.dtos;

import com.staffsync.backend.entities.concretes.Qualification;

public record QualificationDto(
        Integer id,
        String name
) implements Convertible<Qualification> {

    public static QualificationDto fromEntity(Qualification qualification) {
        return new QualificationDto(
                qualification.getId(),
                qualification.getName()
        );
    }

    @Override
    public Qualification toEntity() {
        Qualification qualification = new Qualification();
        qualification.setId(id());
        qualification.setName(name());
        return qualification;
    }
}

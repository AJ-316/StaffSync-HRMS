package com.staffsync.backend.entities.dtos;

public interface Convertible<E> {

    E toEntity();
    E update(Object... entities);

}

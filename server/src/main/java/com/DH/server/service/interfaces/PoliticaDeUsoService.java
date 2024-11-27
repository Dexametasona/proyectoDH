package com.DH.server.service.interfaces;

import com.DH.server.model.entity.PoliticaDeUso;

import java.util.List;

public interface PoliticaDeUsoService {
    PoliticaDeUso create(PoliticaDeUso politica);
    PoliticaDeUso getById(Long id);
    List<PoliticaDeUso> getAll();
    PoliticaDeUso update(Long id, PoliticaDeUso politica);
    void delete(Long id);
}

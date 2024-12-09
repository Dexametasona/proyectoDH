package com.DH.server.service.implement;

import com.DH.server.exception.EntityException;
import com.DH.server.model.entity.PoliticaDeUso;
import com.DH.server.persistance.PoliticaDeUsoRepository;
import com.DH.server.service.interfaces.PoliticaDeUsoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PoliticaDeUsoServiceImpl implements PoliticaDeUsoService{

    
    private final PoliticaDeUsoRepository politicaDeUsoRepository;

    @Override
    public List<PoliticaDeUso> getByProductoId(Long productoId) {
        return politicaDeUsoRepository.findByProductoId(productoId); 
    }

    @Override
    public PoliticaDeUso create(PoliticaDeUso politica) {
        return politicaDeUsoRepository.save(politica);
    }

    @Override
    public PoliticaDeUso getById(Long id) {
        return politicaDeUsoRepository.findById(id)
                .orElseThrow(() -> new EntityException("Política de uso no encontrada con id: " + id));
    }

    @Override
    public List<PoliticaDeUso> getAll() {
        return politicaDeUsoRepository.findAll();
    }

    @Override
    public PoliticaDeUso update(Long id, PoliticaDeUso politica) {
        PoliticaDeUso existingPolitica = getById(id);
        existingPolitica.setNombre(politica.getNombre());
        existingPolitica.setDescripcion(politica.getDescripcion());
        existingPolitica.setContenido(politica.getContenido());
        return politicaDeUsoRepository.save(existingPolitica);
    }

    @Override
    public void delete(Long id) {
        PoliticaDeUso existingPolitica = getById(id);
        politicaDeUsoRepository.delete(existingPolitica);
    }
}

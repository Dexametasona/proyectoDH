package com.DH.server.persistance;

import com.DH.server.model.entity.PoliticaDeUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoliticaDeUsoRepository extends JpaRepository<PoliticaDeUso, Long> {
    List<PoliticaDeUso> findByProductoId(Long productoId);
}

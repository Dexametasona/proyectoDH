package com.DH.server.service.implement;

import com.DH.server.exception.CharacteristicsException;
import com.DH.server.exception.ReviewException;
import com.DH.server.model.entity.Characteristics;
import com.DH.server.persistance.CharacteristicsRepository;
import com.DH.server.service.interfaces.CharacteristicsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CharacteristicsServiceImpl implements CharacteristicsService {

    private final CharacteristicsRepository characteristicsRepository;
    @Override
    public Characteristics create(Characteristics entity) {
        return this.characteristicsRepository.save(entity);
    }

    @Override
    public Characteristics getById(Long id) {
        return this.characteristicsRepository.findById(id).orElseThrow(() ->new CharacteristicsException(" not found by id: "+id));
    }

    @Override
    public Characteristics updateById(Long id, Characteristics entity) {
        var characteristic= this.getById(id);
        if (entity.getDescription() != null) {
            characteristic.setDescription(entity.getDescription());
        }

        if (entity.getType() !=null) {
            characteristic.setType(entity.getType());
        }

        return this.characteristicsRepository.save(characteristic);
    }

    @Override
    public void deleteById(Long id) {
        this.getById(id);
        this.characteristicsRepository.deleteById(id);

    }

    @Override
    public List<Characteristics> getAll() {
        return characteristicsRepository.findAll();
    }
}

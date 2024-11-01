package com.DH.server.service.implement;


import com.DH.server.exception.TagException;
import com.DH.server.model.entity.Tag;
import com.DH.server.persistance.TagRepository;
import com.DH.server.service.interfaces.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public Tag create(Tag entity) {
        return this.tagRepository.save(entity);
    }

    @Override
    public Tag getById(Long id) {
        return this.tagRepository.findById(id).orElseThrow(() -> new TagException("Not found by id:" +id));
    }

    @Override
    public Tag updateById(Long id, Tag entity) {
        var previous=this.getById(id);
        previous.setName(entity.getName());
        return this.tagRepository.save(previous);
    }

    @Override
    public void deleteById(Long id) {
        this.getById(id);
        this.tagRepository.deleteById(id);
    }

    @Override
    public List<Tag> getAll() {
        return this.tagRepository.findAll();
    }
}

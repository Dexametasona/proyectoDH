package com.DH.server.service.implement;

import com.DH.server.model.entity.Category;
import com.DH.server.model.entity.Product;
import com.DH.server.persistance.CategoryRepository;
import com.DH.server.service.interfaces.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category create(Category entity) {
        return this.categoryRepository.save(entity);
    }

    @Override
    public Category getById(Long id) {
        return this.categoryRepository.findById(id).orElseThrow();
    }

    @Override
    public Category updateById(Long id, Category entity) {
        var previous=this.getById(id);
        previous.setName(entity.getName());
        return this.categoryRepository.save(previous);
    }

    @Override
    public void deleteById(Long id) {
        this.getById(id);
        this.categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> getAll() {
        return List.of();
    }

    @Override
    public Page<Category> getAll(Pageable page) {
        return this.categoryRepository.findAll(page);
    }
}

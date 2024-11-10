package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Category;
import org.springframework.web.multipart.MultipartFile;


public interface CategoryService extends GenericService<Category> {


    Category create(Category entity, MultipartFile file);

    Category updateById(Long id, Category entity, MultipartFile file);

}
package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Category;
import com.DH.server.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


public interface CategoryService extends GenericService<Category> {

    //Page<Category> getAll(Pageable page);
}

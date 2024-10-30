package com.DH.server.service.interfaces;

import com.DH.server.model.dto.request.ProductFilters;
import com.DH.server.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService extends GenericService<Product> {
  Page<Product> getAll(Pageable page);

  Page<Product> getAllByFilters(Pageable page,
                                ProductFilters filters);
}

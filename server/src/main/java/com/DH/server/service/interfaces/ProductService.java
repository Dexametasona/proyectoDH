package com.DH.server.service.interfaces;

import com.DH.server.model.dto.request.ProductFilters;
import com.DH.server.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService extends GenericService<Product> {
  Product create(Product entity, List<MultipartFile> photos, Integer categoryId, Integer tagId);


  Product updateById(Long id,
                     Product entity,
                     List<Long> deletePhotoUrls,
                     List<MultipartFile> photos,
                     Integer categoryId,
                     Integer tagId);

  Page<Product> getAll(Pageable page);
  List<Product> getRandom();

  Page<Product> getAllByFilters(Pageable page,
                                ProductFilters filters);

  List<Product> getProductNames(String name);
}

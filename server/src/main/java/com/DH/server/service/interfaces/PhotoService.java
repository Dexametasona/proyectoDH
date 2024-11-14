package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Photo;

import java.util.List;

public interface PhotoService extends GenericService<Photo> {
  List<Photo> getByProductId(Long id);
//  Page<Product> getAll(Pageable page);
}

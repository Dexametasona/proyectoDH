package com.DH.server.service.implement;

import com.DH.server.model.entity.Photo;
import com.DH.server.model.entity.Product;
import com.DH.server.model.mapper.ProductMapper;
import com.DH.server.persistance.PhotoRepository;
import com.DH.server.service.interfaces.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {

  private final PhotoRepository photoRepository;

  @Override
  public Photo create(Photo entity) {
    return this.photoRepository.save(entity);
  }

  @Override
  public Photo getById(Long id) {
    return this.photoRepository.findById(id)
            .orElseThrow();
  }

  @Override
  public Photo updateById(Long id, Photo entity) {
    var previous = this.getById(id);
    if (entity.getUrl() != null) {
      previous.setUrl(entity.getUrl());
    }
    return this.photoRepository.save(previous);
  }

  @Override
  public void deleteById(Long id) {
    this.getById(id);
    this.photoRepository.deleteById(id);
  }

  @Override
  public List<Photo> getAll() {
    return List.of();
  }

}

package com.DH.server.service.implement;

import com.DH.server.exception.EntityException;
import com.DH.server.model.entity.Photo;
import com.DH.server.persistance.PhotoRepository;
import com.DH.server.service.interfaces.PhotoService;
import com.DH.server.service.interfaces.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoServiceImpl implements PhotoService {

  private final PhotoRepository photoRepository;
  private final S3Service s3Service;

  @Override
  public Photo create(Photo entity) {
    return this.photoRepository.save(entity);
  }

  @Override
  public Photo getById(Long id) {
    return this.photoRepository.findById(id)
            .orElseThrow(()->new EntityException("Photo: not found, id:"+id));
  }

  @Override
  public List<Photo> getByProductId(Long id) {
    return this.photoRepository.findByProductId(id);
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
    Photo currentPhoto = this.getById(id);
    String fileUrl = currentPhoto.getUrl();
    String basePath = "https://gameyard-s3-assets.s3.amazonaws.com/";
    String fileId = fileUrl.substring(basePath.length());
    this.photoRepository.deleteById(id);
    this.s3Service.deleteFileById(fileId);
  }

  @Override
  public List<Photo> getAll() {
    return List.of();
  }

}

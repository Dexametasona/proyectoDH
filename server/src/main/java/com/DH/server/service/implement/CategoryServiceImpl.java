package com.DH.server.service.implement;

import com.DH.server.exception.CategoryException;
import com.DH.server.model.entity.Category;
import com.DH.server.persistance.CategoryRepository;
import com.DH.server.service.interfaces.CategoryService;
import com.DH.server.service.interfaces.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final S3Service s3Service;

    @Override
    public Category create(Category entity, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            String url=this.s3Service.uploadFile(file);

            entity.setPhoto_Url(url);
        }
        return this.categoryRepository.save(entity);
    }


    @Override
    public Category create(Category entity) {
        return null;
    }

    @Override
    public Category getById(Long id) {
        return this.categoryRepository.findById(id).orElseThrow(() ->new CategoryException("Category not found by id: "+id));
    }

    @Override
    public Category updateById(Long id, Category entity) {
        return null;
    }

    @Override
    public Category updateById(Long id, Category entity, MultipartFile file) {
        var previous=this.getById(id);

        previous.setTitle(entity.getTitle());
        previous.setDescription((entity.getDescription()));

        if (file != null && !file.isEmpty()) {

            if (previous.getPhoto_Url() != null) {
                String previousPhotoKey = previous.getPhoto_Url().substring(previous.getPhoto_Url().lastIndexOf("/") + 1);
                s3Service.deleteFileById(previousPhotoKey);
            }
            String newPhoto = s3Service.uploadFile(file);
            previous.setPhoto_Url(newPhoto);
        }

        return this.categoryRepository.save(previous);
    }

    @Override
    public void deleteById(Long id) {

        var previous=this.getById(id);

        if (previous.getPhoto_Url() != null) {
            String previousPhotoKey = previous.getPhoto_Url().substring(previous.getPhoto_Url().lastIndexOf("/") + 1);
            s3Service.deleteFileById(previousPhotoKey);
        }

        this.categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

}

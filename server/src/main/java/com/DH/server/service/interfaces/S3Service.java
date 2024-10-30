package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Photo;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Service {
    String uploadFile(MultipartFile file) throws IOException;
    boolean deleteFileById(String id);
}

package com.DH.server.service.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
    String uploadFile(MultipartFile file);
    boolean deleteFileById(String id);
}

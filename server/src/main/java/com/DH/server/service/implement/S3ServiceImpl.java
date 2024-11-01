package com.DH.server.service.implement;

import com.DH.server.service.interfaces.S3Service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log4j2
public class S3ServiceImpl implements S3Service {

  private final AmazonS3 s3client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucketName;

  @Override
  public String uploadFile(MultipartFile file) {
    if (file.isEmpty()) return null;
    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType(file.getContentType());
    metadata.setContentDisposition("inline");

    PutObjectResult putObjectResult = null;
    try {
      putObjectResult = s3client.putObject(bucketName, fileName, file.getInputStream(), metadata);
      log.info(putObjectResult.getMetadata());
      String fileUrl = s3client.getUrl(bucketName, fileName).toString();
      log.info("File uploaded to: {}", fileUrl);

      return fileUrl;
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public boolean deleteFileById(String id) {
    try {
      s3client.deleteObject(bucketName, id);
      log.info("File deleted: {}", id);
      return true; // Indicate successful deletion
    } catch (Exception e) {
      log.error("Error deleting file: {}", e.getMessage());
      return false; // Indicate failure
    }
  }
}

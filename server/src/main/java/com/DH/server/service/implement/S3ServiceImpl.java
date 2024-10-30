package com.DH.server.service.implement;

import com.DH.server.service.interfaces.S3Service;
import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Log4j2
public class S3ServiceImpl implements S3Service {

  private final AmazonS3 s3client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucketName;

  @Override
  public String uploadFile(String id, MultipartFile file) throws IOException {

    var putObjectResult = s3client.putObject(bucketName, id, file.getInputStream(), null);
    log.info(putObjectResult.getMetadata());
    String fileUrl = s3client.getUrl(bucketName, id).toString();
    log.info("File uploaded to: {}", fileUrl);

    return fileUrl;
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

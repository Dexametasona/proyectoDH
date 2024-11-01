package com.DH.server.exception;

import com.DH.server.model.dto.ApiResponseDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(EntityException.class)
  public ResponseEntity<?> handleEntityException(EntityException e) {
    var exception = new ApiResponseDto<LocalDateTime>(e.getMessage(), LocalDateTime.now());
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(exception);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
    List<String> errores = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());

    ApiResponseDto<List<String>> errorResponse = new ApiResponseDto<>("Validation Failed", errores );
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(errorResponse);
  }
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<?> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    String message = Objects.requireNonNull(ex.getRootCause()).getMessage();
    ApiResponseDto<String> errorResponse = new ApiResponseDto<>(message, ex.getLocalizedMessage() );
    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(errorResponse);
  }
  @ExceptionHandler(PropertyReferenceException.class)
  public ResponseEntity<?> handlePropertyReferenceException(PropertyReferenceException ex) {
    ApiResponseDto<String> errorResponse = new ApiResponseDto<>("Invalid parameter: " + ex.getMessage(), ex.getLocalizedMessage() );
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(errorResponse);
  }
  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<?> handleNotReadableEx(HttpMessageNotReadableException ex){
    ApiResponseDto<String> errorResponse = new ApiResponseDto<>("Request body invalid", ex.getMessage() );
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(errorResponse);
  }
  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<?> handleMismatchTypeExceptions(MethodArgumentTypeMismatchException ex) {
    List<String> data = new ArrayList<>();
    data.add("parameter: "+ ex.getName());
    data.add("expectedType: " + (ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "Unknown"));
    data.add("message: "+ ex.getMessage());

    ApiResponseDto<List<String>> errorResponse = new ApiResponseDto<>(ex.getMessage(), data );
    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(errorResponse);
  }
}

package com.DH.server.util;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class FutureDateValidator implements ConstraintValidator<FutureDate, LocalDate> {
  @Override
  public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
    if (value == null) return false;
    return value.isAfter(LocalDate.now());
  }
}

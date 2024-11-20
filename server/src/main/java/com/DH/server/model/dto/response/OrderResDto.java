package com.DH.server.model.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record OrderResDto(
        long id,
        LocalDateTime createdAt,
        LocalDate shipStart,
        LocalDate shipEnd,
        String shipAddress,
        double amount,
        String remarks,
        long productId,
        long userId
) {
}

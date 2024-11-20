package com.DH.server.model.dto.request;


import java.time.LocalDate;

public record OrderFilters(
        Long userId,
        Long productId,
        LocalDate start,
        LocalDate end
) {
}

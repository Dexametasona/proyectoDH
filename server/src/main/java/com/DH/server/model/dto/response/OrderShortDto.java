package com.DH.server.model.dto.response;

import java.time.LocalDate;

public record OrderShortDto(
        long id,
        LocalDate shipStart,
        LocalDate shipEnd
) {
}

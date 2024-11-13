package com.DH.server.model.dto.response;

import java.time.LocalDateTime;

public record UserResDto(
        long id,
        String name,
        String lastname,
        String email,
        int role,
        boolean isEnabled,
        boolean isDeleted,
        LocalDateTime createdAt
) {
    public String getEmail() {
        return email;
    }
}

package com.DH.server.model.dto.response;

public record UserShortDto(
        long id,
        String name,
        String lastname,
        String email,
        int role
) {
}

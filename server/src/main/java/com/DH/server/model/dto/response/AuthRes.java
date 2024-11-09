package com.DH.server.model.dto.response;

public record AuthRes(
        String token,
        int rol,
        long id
) {
}

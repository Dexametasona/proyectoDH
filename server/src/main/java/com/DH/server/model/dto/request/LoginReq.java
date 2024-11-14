package com.DH.server.model.dto.request;

public record LoginReq(
        String email,
        String password
) {
}

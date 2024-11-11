package com.DH.server.model.dto.response;

import com.DH.server.model.entity.Photo;

public record CategoryResDto(
        long ID, String title, String description, String photoUrl) {
}

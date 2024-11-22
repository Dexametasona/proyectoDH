package com.DH.server.model.dto.response;

import java.time.LocalDateTime;

public record ReviewResDto (

        long id,
        String comment,

        int score,

        long author_id,

        long product_id,

        LocalDateTime date

){
}

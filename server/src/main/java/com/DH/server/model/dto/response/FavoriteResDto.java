package com.DH.server.model.dto.response;

public record FavoriteResDto (
     Long productId,
     String productName,
     String category,
     String photoUrl,
     double productPrice

)  {
}

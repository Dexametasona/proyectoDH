package com.DH.server.model.dto.response;

public record FavoriteResDto (
     Long productId,
     String productName,
     String productBrand,
     double productPrice

)  {
}

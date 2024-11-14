package com.DH.server.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProductFilters(
        List<Integer> categoryIds,
        //@Min(0)
        //@Schema(description = "Category id")
        //Integer categoryId,
        @Min(0)
        @Schema(description = "Tag id")
        Integer tagId,
        @Size(min = 4)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        @Schema(description = "Product name")
        String name,
        @Size(min = 4)
        @Pattern(regexp = "^[a-zA-Z]+$", message = "Doesn't match ^[a-zA-Z]+$")
        @Schema(description = "Brand name")
        String brand,
        @Min(0)
        @Schema(description = "Upper price limit, it must be use with lower price limit")
        Double priceLimitUpper,
        @Min(0)
        @Schema(description = "Lower price limit, it must be use with upper price limit")
        Double priceLimitLower
) {

}

package com.DH.server.model.dto.request;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record UserFilters(
        @Size(min = 4)
        String name,
        @Size(min = 4)
        String lastname,
        @Size(min = 4)
        String email,
        @Min(0)
        @Max(1)
        Integer role
        ) {
}

package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserUpdateDto(
        @Size(min = 2, max = 50, groups = { OnUpdate.class})
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$",
                groups = {OnCreate.class, OnUpdate.class})
        String name,
        @Size(min = 2, max = 100, groups = { OnUpdate.class})
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$",
                groups = {OnCreate.class, OnUpdate.class})
        String lastname
) {
}

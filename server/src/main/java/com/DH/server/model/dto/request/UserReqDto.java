package com.DH.server.model.dto.request;


import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserReqDto(
        @NotBlank(groups = OnCreate.class)
        @Size(min = 2, max = 50, groups = {OnCreate.class, OnUpdate.class})
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$",
                groups = {OnCreate.class, OnUpdate.class})
        String name,
        @NotBlank(groups = OnCreate.class)
        @Size(min = 2, max = 100, groups = {OnCreate.class, OnUpdate.class})
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$",
                groups = {OnCreate.class, OnUpdate.class})
        String lastname,
        @NotBlank(groups = OnCreate.class)
        @Pattern(regexp = "^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$",
                message = "Doesn't match ^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$",
                groups = {OnCreate.class, OnUpdate.class})
        @Size(min = 10, groups = {OnCreate.class, OnUpdate.class})
        String email,
        @NotBlank(groups = OnCreate.class)
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*(\\W|_))(?!.* ).{8,16}$",
        message = "Doesn't match ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*(\\W|_))(?!.* ).{8,16}$",
        groups = {OnCreate.class, OnUpdate.class})
        String password
) {
}

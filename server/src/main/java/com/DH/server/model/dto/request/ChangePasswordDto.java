package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ChangePasswordDto(
        @NotBlank()
        String password,
        @NotBlank(groups = OnCreate.class)
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*(\\W|_))(?!.* ).{8,16}$",
                message = "Doesn't match ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*(\\W|_))(?!.* ).{8,16}$",
                groups = {OnCreate.class})
        String newPassword
) {
}

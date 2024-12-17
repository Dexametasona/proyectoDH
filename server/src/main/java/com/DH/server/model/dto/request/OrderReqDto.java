package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.util.FutureDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record OrderReqDto(
        @NotNull(groups = {OnCreate.class})
        @JsonFormat(pattern = "yyyy-MM-dd")
        @FutureDate(groups = {OnCreate.class, OnUpdate.class})
        LocalDate shipStart,
        @NotNull(groups = {OnCreate.class})
        @JsonFormat(pattern = "yyyy-MM-dd")
        @FutureDate(groups = {OnCreate.class, OnUpdate.class})
        LocalDate shipEnd,
        @NotBlank(groups = {OnCreate.class})
        String shipAddress,
        String remarks,
        @NotNull(groups = {OnCreate.class})
        Long productId
) {
}

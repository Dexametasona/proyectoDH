package com.DH.server.model.dto;

import java.util.List;

public record CustomPage<T> (
        List<T> content,
        int currentPage,
        int totalPages,
        long totalElements,
        boolean isFirst,
        boolean isLast,
        int pageSize
){
}

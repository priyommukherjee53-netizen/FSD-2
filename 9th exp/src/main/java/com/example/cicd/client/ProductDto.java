package com.example.cicd.client;

import java.math.BigDecimal;

public record ProductDto(Long id, String name, BigDecimal price) {
}

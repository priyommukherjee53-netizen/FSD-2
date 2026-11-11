package com.example.cicd.client;

import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

/**
 * Simulates the frontend / another microservice that consumes the product API.
 * The Pact consumer test records what this client expects from the backend.
 */
public class ProductClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String baseUrl;

    public ProductClient(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public Optional<ProductDto> getProduct(long id) {
        try {
            return Optional.ofNullable(
                    restTemplate.getForObject(baseUrl + "/api/products/{id}", ProductDto.class, id));
        } catch (HttpClientErrorException.NotFound e) {
            return Optional.empty();
        }
    }
}

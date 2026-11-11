package com.example.cicd.contract;

import au.com.dius.pact.consumer.MockServer;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.junit5.PactConsumerTestExt;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.core.model.PactSpecVersion;
import au.com.dius.pact.core.model.RequestResponsePact;
import au.com.dius.pact.core.model.annotations.Pact;
import com.example.cicd.client.ProductClient;
import com.example.cicd.client.ProductDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * CONTRACT TEST (consumer side). Defines what the frontend expects from the backend
 * and writes the contract to target/pacts/product-frontend-product-service.json
 */
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "product-service", pactVersion = PactSpecVersion.V3)
class ProductConsumerPactTest {

    @Pact(consumer = "product-frontend")
    RequestResponsePact productExistsPact(PactDslWithProvider builder) {
        PactDslJsonBody body = new PactDslJsonBody()
                .integerType("id", 1L)
                .stringType("name", "Laptop")
                .decimalType("price", 999.99);

        return builder
                .given("product 1 exists")
                .uponReceiving("a request for product 1")
                .path("/api/products/1")
                .method("GET")
                .willRespondWith()
                .status(200)
                .headers(Map.of("Content-Type", "application/json"))
                .body(body)
                .toPact();
    }

    @Pact(consumer = "product-frontend")
    RequestResponsePact productMissingPact(PactDslWithProvider builder) {
        return builder
                .given("product 99 does not exist")
                .uponReceiving("a request for a missing product")
                .path("/api/products/99")
                .method("GET")
                .willRespondWith()
                .status(404)
                .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "productExistsPact")
    void clientReadsExistingProduct(MockServer mockServer) {
        ProductClient client = new ProductClient(mockServer.getUrl());

        Optional<ProductDto> product = client.getProduct(1);

        assertTrue(product.isPresent());
        assertEquals("Laptop", product.get().name());
    }

    @Test
    @PactTestFor(pactMethod = "productMissingPact")
    void clientHandlesMissingProduct(MockServer mockServer) {
        ProductClient client = new ProductClient(mockServer.getUrl());

        assertTrue(client.getProduct(99).isEmpty());
    }
}

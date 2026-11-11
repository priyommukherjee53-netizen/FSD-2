package com.example.cicd.contract;

import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.State;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import com.example.cicd.model.Product;
import com.example.cicd.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.math.BigDecimal;
import java.util.Optional;

import static org.mockito.Mockito.when;

/**
 * CONTRACT TEST (provider side). Replays every request from the consumer's pact file
 * against the real running backend and checks the responses match.
 * NOTE: run ProductConsumerPactTest first (mvn verify does this automatically).
 */
@Provider("product-service")
@PactFolder("target/pacts")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductProviderPactTest {

    @LocalServerPort
    int port;

    @MockBean
    ProductService productService;

    @BeforeEach
    void setUp(PactVerificationContext context) {
        context.setTarget(new HttpTestTarget("localhost", port));
    }

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void verifyPact(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @State("product 1 exists")
    void productOneExists() {
        when(productService.findById(1L))
                .thenReturn(Optional.of(new Product(1L, "Laptop", new BigDecimal("999.99"))));
    }

    @State("product 99 does not exist")
    void productNinetyNineMissing() {
        when(productService.findById(99L)).thenReturn(Optional.empty());
    }
}

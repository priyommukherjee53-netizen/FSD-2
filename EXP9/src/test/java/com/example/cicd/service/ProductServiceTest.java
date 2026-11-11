package com.example.cicd.service;

import com.example.cicd.model.Product;
import com.example.cicd.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/** UNIT TEST: tests one class in isolation, repository is mocked. */
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    ProductRepository repository;

    @InjectMocks
    ProductService service;

    @Test
    void priceAfterDiscount_appliesPercentage() {
        when(repository.findById(1L))
                .thenReturn(Optional.of(new Product(1L, "Laptop", new BigDecimal("1000.00"))));

        BigDecimal result = service.priceAfterDiscount(1L, 10);

        assertEquals(0, new BigDecimal("900.00").compareTo(result));
    }

    @Test
    void priceAfterDiscount_rejectsInvalidPercent() {
        assertThrows(IllegalArgumentException.class, () -> service.priceAfterDiscount(1L, 0));
        assertThrows(IllegalArgumentException.class, () -> service.priceAfterDiscount(1L, 95));
        verifyNoInteractions(repository);
    }

    @Test
    void priceAfterDiscount_throwsWhenProductMissing() {
        when(repository.findById(42L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.priceAfterDiscount(42L, 10));
    }

    @Test
    void create_savesProduct() {
        Product input = new Product(null, "Mouse", new BigDecimal("25.00"));
        when(repository.save(input)).thenReturn(new Product(5L, "Mouse", new BigDecimal("25.00")));

        Product saved = service.create(input);

        assertEquals(5L, saved.getId());
        verify(repository).save(input);
    }
}

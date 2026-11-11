package com.example.cicd.service;

import com.example.cicd.model.Product;
import com.example.cicd.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Optional<Product> findById(Long id) {
        return repository.findById(id);
    }

    public Product create(Product product) {
        return repository.save(product);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    /** Business rule used for unit testing: discount must be between 1 and 90 percent. */
    public BigDecimal priceAfterDiscount(Long id, int percent) {
        if (percent < 1 || percent > 90) {
            throw new IllegalArgumentException("Discount must be between 1 and 90 percent");
        }
        Product product = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product " + id + " not found"));
        return product.getPrice()
                .multiply(BigDecimal.valueOf(100L - percent))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}

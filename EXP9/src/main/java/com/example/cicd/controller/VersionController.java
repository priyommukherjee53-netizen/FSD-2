package com.example.cicd.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** Lets us see which release (stable or canary) answered a request. */
@RestController
public class VersionController {

    @Value("${app.version:dev}")
    private String version;

    @GetMapping("/api/version")
    public Map<String, String> version() {
        return Map.of("version", version);
    }
}

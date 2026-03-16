package com.botmakers.Botmakers.Assignment.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Resource", description = "Protected and Public Resource endpoints")
public class ResourceController {

    @Operation(summary = "Public endpoint accessible by anyone")
    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> getPublicContent() {
        return ResponseEntity.ok(Map.of(
                "message", "This is public content accessible by anyone."
        ));
    }

    @Operation(summary = "User endpoint accessible by USER or ADMIN role", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, String>> getUserContent() {
        return ResponseEntity.ok(Map.of(
                "message", "This is Protected User Content. Role Required: USER or ADMIN.",
                "data", "User Dashboard Data"
        ));
    }

    @Operation(summary = "Admin endpoint accessible only by ADMIN role", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> getAdminContent() {
        return ResponseEntity.ok(Map.of(
                "message", "This is Highly Privileged Admin Content. Role Required: ADMIN.",
                "data", "Admin Dashboard Data, System Metrics"
        ));
    }
}

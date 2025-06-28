package com.quality.electrodomesticos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private static final String ADMIN_USER = "admin";
    private static final String ADMIN_PASS = "admin123";
    private List<Map<String, Object>> products = new ArrayList<>();
    private int nextId = 1;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password, HttpSession session) {
        if (ADMIN_USER.equals(username) && ADMIN_PASS.equals(password)) {
            session.setAttribute("admin", true);
            return ResponseEntity.ok("Login exitoso");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Sesión cerrada");
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestParam String name, @RequestParam String description, @RequestParam double price) {
        Map<String, Object> product = new HashMap<>();
        product.put("id", nextId++);
        product.put("name", name);
        product.put("description", description);
        product.put("price", price);
        products.add(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        boolean removed = products.removeIf(p -> (int)p.get("id") == id);
        if (removed) {
            return ResponseEntity.ok("Producto eliminado");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
    }

    @GetMapping("/products")
    public ResponseEntity<List<Map<String, Object>>> getProducts() {
        return ResponseEntity.ok(products);
    }
}

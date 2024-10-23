package com.example.config; // Ajustez selon votre structure de package

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Ceci s'applique à tous les endpoints
                .allowedOrigins("http://localhost:3000")  // Autorise les requêtes venant de votre frontend React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Méthodes HTTP autorisées
                .allowedHeaders("*")  // Tous les headers sont autorisés
                .allowCredentials(true);  // Autorise les credentials (cookies, auth headers)
    }
}
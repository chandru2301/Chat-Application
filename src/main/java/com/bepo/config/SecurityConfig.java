package com.bepo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/ws/**").permitAll()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/rooms/**").permitAll()
           // .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/", "/index.html", "/css/**", "/js/**").permitAll()
            .anyRequest().authenticated()
        );
        
    return http.build();
}
}
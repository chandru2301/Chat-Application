package com.bepo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BepoApplication {

	public static void main(String[] args) {
	
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		// Set them as system properties for Spring Boot to use
		System.setProperty("server.port", dotenv.get("PORT", "8080"));
		System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME", "bepodb_user"));
		System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD", "E1XgZbH5Xs5cTRrUJkpW3gS6P1zOikHA"));

		SpringApplication.run(BepoApplication.class, args);
	}
	

}

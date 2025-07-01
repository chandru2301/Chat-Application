# Bepo - Real-Time Chat Application

Bepo is a real-time chat application built with Spring Boot, WebSocket, and PostgreSQL. It supports multiple chat rooms, user presence, and a modern web UI.

## Features
- Real-time messaging with WebSocket
- Multiple chat rooms
- User join/leave notifications
- Typing indicators
- Responsive and modern UI
- Docker support for easy deployment

## Tech Stack
- Java 17
- Spring Boot 3
- WebSocket (STOMP)
- PostgreSQL
- Maven
- Docker

## Getting Started

### Prerequisites
- Java 17+
- Maven
- PostgreSQL database

### Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/chandru2301/Chat-Application.git
   cd Chat-Application
   ```
2. **Configure environment variables:**
   Create a `priv.env` file (not committed) with your database credentials:
   ```env
   SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<db>
   SPRING_DATASOURCE_USERNAME=<username>
   SPRING_DATASOURCE_PASSWORD=<password>
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
   ```
3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
4. **Access the app:**
   Open [http://localhost:8080](http://localhost:8080) in your browser.

### Docker
1. **Build the Docker image:**
   ```bash
   docker build -t bepo-chat-app .
   ```
2. **Run the container:**
   ```bash
   docker run -p 8080:8080 --env-file priv.env bepo-chat-app
   ```

### Deploying to Render
- Push your code to GitHub.
- Create a new Web Service on [Render](https://render.com/).
- Set environment variables in the Render dashboard (do not use SSL properties in `application.properties`).
- Render will handle HTTPS automatically.

## Environment Variables
- `PORT` (provided by Render)
- `DB_USERNAME`, `DB_PASSWORD` (or use `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`)
- `SPRING_DATASOURCE_URL`

## License
This project is licensed under the MIT License. 
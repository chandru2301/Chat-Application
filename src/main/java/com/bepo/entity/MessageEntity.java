package com.bepo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class MessageEntity {
    
    @Id
    private String id;
    
    private String content;
    private String sender;
    private String chatRoom;
    private String messageType;
    private LocalDateTime timestamp;
    
    // Getters and setters
}
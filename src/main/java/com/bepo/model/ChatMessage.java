package com.bepo.model;

import java.time.LocalDateTime;

public class ChatMessage {
    
    private String id;
    private String content;
    private String sender;
    private String chatRoom;
    private MessageType type;
    private LocalDateTime timestamp;
    
    public enum MessageType {
        CHAT, JOIN, LEAVE, TYPING
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getSender() {
        return sender;
    }
    
    public void setSender(String sender) {
        this.sender = sender;
    }
    
    public String getChatRoom() {
        return chatRoom;
    }
    
    public void setChatRoom(String chatRoom) {
        this.chatRoom = chatRoom;
    }
    
    public MessageType getType() {
        return type;
    }
    
    public void setType(MessageType type) {
        this.type = type;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
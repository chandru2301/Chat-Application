package com.bepo.model;

import java.util.HashSet;
import java.util.Set;

public class ChatRoom {
    
    private String id;
    private String name;
    private Set<String> users = new HashSet<>();
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Set<String> getUsers() {
        return users;
    }
    
    public void setUsers(Set<String> users) {
        this.users = users;
    }
    
    public void addUser(String username) {
        this.users.add(username);
    }
    
    public void removeUser(String username) {
        this.users.remove(username);
    }
}
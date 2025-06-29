package com.bepo.controller;

import com.bepo.model.ChatRoom;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final Map<String, ChatRoom> chatRooms = new HashMap<>();

    @GetMapping
    public List<ChatRoom> getAllRooms() {
        return new ArrayList<>(chatRooms.values());
    }

    @PostMapping
    public ChatRoom createRoom(@RequestBody ChatRoom chatRoom) {
        String roomId = UUID.randomUUID().toString();
        chatRoom.setId(roomId);
        chatRooms.put(roomId, chatRoom);
        return chatRoom;
    }

    @GetMapping("/{roomId}")
    public ChatRoom getRoomById(@PathVariable String roomId) {
        return chatRooms.get(roomId);
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoom(@PathVariable String roomId) {
        chatRooms.remove(roomId);
    }
}
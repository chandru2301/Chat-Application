package com.bepo.repository;

import com.bepo.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, String> {
    List<MessageEntity> findByChatRoomOrderByTimestampAsc(String chatRoom);
}
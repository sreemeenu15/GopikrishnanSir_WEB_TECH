package com.example.Notes_Manager.repository;
import org.springframework.web.bind.annotation.*;

import com.example.Notes_Manager.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteRepository extends MongoRepository<Note, String> {
}
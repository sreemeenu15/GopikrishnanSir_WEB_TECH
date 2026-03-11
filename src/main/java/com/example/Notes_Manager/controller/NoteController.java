package com.example.Notes_Manager.controller;

import com.example.Notes_Manager.model.Note;
import com.example.Notes_Manager.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin
public class NoteController {

    private final NoteRepository repository;

    public NoteController(NoteRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Note addNote(@RequestBody Note note) {
        return repository.save(note);
    }

    @GetMapping
    public List<Note> getNotes() {
        return repository.findAll();
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable String id, @RequestBody Note updatedNote) {
        Note note = repository.findById(id).orElseThrow();
        note.setTitle(updatedNote.getTitle());
        note.setDescription(updatedNote.getDescription());
        return repository.save(note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable String id) {
        repository.deleteById(id);
    }
}

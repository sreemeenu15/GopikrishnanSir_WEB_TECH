package com.example.Notes_Manager.controller;

import com.example.Notes_Manager.model.Book;
import com.example.Notes_Manager.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin
public class BookController {

    @Autowired
    private BookRepository repository;


    @PostMapping
    public Book addBook(@RequestBody Book book){
        return repository.save(book);
    }


    @GetMapping
    public List<Book> getBooks(){
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title){
        return repository.findByTitleRegex(".*"+title+".*");
    }


    @GetMapping("/category/{category}")
    public List<Book> byCategory(@PathVariable String category){
        return repository.findByCategoryIgnoreCase(category);
    }


    @GetMapping("/sort/price")
    public List<Book> sortByPrice(){
        return repository.findAll(Sort.by("price"));
    }


    @GetMapping("/sort/rating")
    public List<Book> sortByRating(){
        return repository.findAll(Sort.by(Sort.Direction.DESC,"rating"));
    }


    @GetMapping("/top")
    public List<Book> topBooks(){
        return repository.findAll()
                .stream()
                .filter(b -> b.getRating() >= 4)
                .limit(5)
                .toList();
    }

    @GetMapping("/page")
    public Page<Book> getBooksPage(@RequestParam int page){

        Pageable pageable = PageRequest.of(page,5);

        return repository.findAll(pageable);
    }
}

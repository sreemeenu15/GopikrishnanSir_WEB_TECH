package com.example.Notes_Manager.repository;

import com.example.Notes_Manager.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findByCategoryIgnoreCase(String category);

    List<Book> findByTitleRegex(String regex);
}

package com.mgstory.controller;

import com.mgstory.repository.ArticleRepository;
import com.mgstory.domain.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(value="api/v1/articles")
public class ArticleController{

    @Autowired
    ArticleRepository repository;

    Article article = new Article();

    @RequestMapping(value="/{id}",method = RequestMethod.GET)
    public Article findById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @RequestMapping(value="", method=RequestMethod.GET)
    public Iterable<Article> findAll(){
        return repository.findAll();
    }

    @RequestMapping(value="/sortbyid", method=RequestMethod.GET)
    public Iterable<Article> findAllOrderByIdAsc(){
        return repository.findAllByOrderByIdAsc();
    }
}
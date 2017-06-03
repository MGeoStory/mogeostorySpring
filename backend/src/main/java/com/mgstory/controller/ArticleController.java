package com.mgstory.controller;

import com.mgstory.repository.ArticleRepository;
import com.mgstory.domain.Articles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/v1/articles")
public class ArticleController{

    @Autowired
    ArticleRepository repository;

    Articles articles = new Articles();

    @RequestMapping(value="", method=RequestMethod.GET)
    public Iterable<Articles> findAll(){
        return repository.findAll();
    }

    @RequestMapping(value="/sortbyid", method=RequestMethod.GET)
    public Iterable<Articles> findAllOrderByIdAsc(){
        return repository.findAllByOrderByIdAsc();
    }
}
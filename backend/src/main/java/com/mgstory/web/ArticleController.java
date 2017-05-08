package com.mgstory.web;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;

import com.mgstory.domain.Article;
import com.mgstory.domain.ArticleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


// @RestController
// @RequestMapping(value = "api/article")
public class ArticleController {

    // private final Logger logger = LoggerFactory.getLogger(this.getClass());

    // @Autowired
    // ArticleReopsitory repository;

    // Article article = new Article();


    // @RequestMapping(value = "", method = RequestMethod.GET)
    // public Article getArticles() {
    //     //TO DO...
    //     logger.info("getArticles");
    //     logger.info(repository.findAll().toString());
    //     return article;
    // }


    // @RequestMapping(value="/{id}", method = RequestMethod.GET, produces = "application/json")
    // public Article getArticle(@PathVariable int id) {
    //     //TO DO...
    //     logger.info("find by id: " + id);
    //     logger.info(repository.findOne(id).toString());
    //     return article;
    // }
}
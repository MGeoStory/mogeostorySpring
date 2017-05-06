package com.mgstory.web;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;

import com.mgstory.domain.Article;

@RestController
@RequestMapping("api/article")
public class ArticleController {

    Article article = new Article();


    @RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
    public Article getArticles() {
        //TO DO...
        return article;
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET, produces = "application/json")
    public Article getArticle(@PathVariable int id) {
        //TO DO...
        return article;
    }
}
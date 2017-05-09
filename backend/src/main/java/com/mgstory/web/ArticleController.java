package com.mgstory.web;

import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;

import com.mgstory.domain.Article;
import com.mgstory.domain.ArticleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping(value = "api/article")
public class ArticleController {

    @Autowired
    ArticleRepository repository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    Article article = new Article();

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Article> findAll() {
        // logger.info("getArticles");
        // logger.info(repository.findAll());
        return repository.findAll();
    }

    @RequestMapping(value="/search/kind/{kind}", method = RequestMethod.GET)
    public List<Article> findByKind(@PathVariable String kind) {
        return repository.findByKind(kind);
    }

    @RequestMapping(value="/search/id/{id}", method = RequestMethod.GET)
    public Article findByKind(@PathVariable Integer id) {
        return repository.findOne(id);
    }
}
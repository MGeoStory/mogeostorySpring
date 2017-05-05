package com.mgstory;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;

import com.mgstory.Articles;

@RestController
@RequestMapping("api/article")
public class ArticleController {

    Articles articles = new Articles();

    @RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = "application/json")
    public Articles getArticlesInJSON(@PathVariable String name) {

        articles.setName(name);
        articles.setEmail("employee1@genuitec.com");
        return articles;

    }

    @RequestMapping(value = "/{name}.xml", method = RequestMethod.GET, produces = "application/xml")
    public Articles getArticlesInXML(@PathVariable String name) {

        articles.setName(name);
        articles.setEmail("employee1@genuitec.com");

        return articles;

    }


}
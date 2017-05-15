
package com.mgstory.web;

import com.fasterxml.jackson.databind.util.JSONPObject;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;

import com.mgstory.domain.CountyTW10;
import com.mgstory.repository.CountyTW10Repository;

@RestController
@RequestMapping(value = "c/")
public class CountyTW10Controller {

    @Autowired
    CountyTW10Repository repository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    CountyTW10 article = new CountyTW10();

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<CountyTW10> findAll() {
        // logger.info("getArticles");
        // logger.info(repository.findAll());
        return repository.findAll();
    }
}
package com.mgstory.controller;

import com.mgstory.repository.PostDisposableRepository;
import com.mgstory.domain.PostDisposable;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

@RestController
@RequestMapping(value = "api/v1/disposable")
public class PostDisposableController {

    final static Logger logger = LoggerFactory.getLogger(PostDisposableController.class);

    @Autowired
    PostDisposableRepository repository;

    PostDisposable disposable = new PostDisposable();

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<PostDisposable> findAll() {
        return repository.findAll();
    }

    @RequestMapping(value = "/find/extentofyears", method = RequestMethod.GET)
    public Map<String, Integer> findExtentYearValues() {
        Integer minYear = repository.findMinYear();
        Integer maxYear = repository.findMaxYear();
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("minYear", minYear);
        map.put("maxYear", maxYear);
        return map;
    }

    @RequestMapping(value = "/{year}", method = RequestMethod.GET)
    public Iterable<PostDisposable> findByYear(@PathVariable Integer year) {
        logger.info("year={}", year);
        return repository.findByYears(year);
    }

    @RequestMapping(value = "/{year}/city/{cityId}", method = RequestMethod.GET)
    public Iterable<PostDisposable> findByYearAndCityId(@PathVariable("year") Integer year,
            @PathVariable("cityId") String cityId) {
        logger.info("year={}, cityid={}", year, cityId);
        return repository.findByYearsAndCityId(year, cityId.toUpperCase());    }
}
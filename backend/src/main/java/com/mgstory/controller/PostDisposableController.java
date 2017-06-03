package com.mgstory.controller;

import com.mgstory.repository.PostDisposableRepository;
import com.mgstory.domain.PostDisposable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/v1/disposable")
public class PostDisposableController{
    @Autowired
    PostDisposableRepository repository;

    PostDisposable disposable = new PostDisposable();

    @RequestMapping(value="", method=RequestMethod.GET)
    public Iterable<PostDisposable> findAll(){
        return repository.findAll();
    }

}
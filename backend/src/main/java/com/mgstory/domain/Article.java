package com.mgstory.domain;

import java.io.Serializable;

import javax.persistence.Column;
// import com.fasterxml.jackson.annotation.JsonRootName;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// // @JsonRootName(value = "articles")
@Entity
// @Table (name = "public.articles")
public class Article implements Serializable {

    private static final long serialVersionUID = 100001L;

    // Object-Relational Mapping => generate primary key
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "title")
    private String title;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return title;
    }

    public Article() {
    }

    public Article(String title) {
        this.title = title;
    }
}
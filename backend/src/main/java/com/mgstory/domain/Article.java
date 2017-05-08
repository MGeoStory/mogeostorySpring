package com.mgstory.domain;

import java.io.Serializable;

import javax.persistence.Column;
// import com.fasterxml.jackson.annotation.JsonRootName;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

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

    @Column(name = "summary")
    private String summary;

    @Column(name = "author")
    private String author;

    @Column(name = "kind")
    private String kind;

    @Column(name = "image_link")
    private String image_link;

    @Column(name = "tags")
    private String tags;

    @Column(name = "post_date")
    private Date post_date;

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSummary() {
        return summary;
    }

    public String getAuthor() {
        return author;
    }

    public String getKind() {
        return kind;
    }

    public String getImageLink() {
        return image_link;
    }

    public String getTags() {
        return tags;
    }

    public Date getPostDate() {
        return post_date;
    }

    public Article() {
    }
}
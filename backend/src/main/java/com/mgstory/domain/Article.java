package com.mgstory.domain;
 

import com.fasterxml.jackson.annotation.JsonRootName;
 
@JsonRootName(value = "articles")
public class Article{
 
    private int id;
    private String name;
 

    public int getId(){
        return id;
    }

    public String getName() {
   	 return name;
    }
 
    public Article() {
    }
 
}
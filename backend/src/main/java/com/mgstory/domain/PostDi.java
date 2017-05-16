package com.mgstory.domain;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

@Entity
@Table(name = "post_di")
public class PostDi implements Serializable {
    private static final long serialVersionID = 100003L;

    //it's not good design. remeber to set id in postgrel
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "years")
    private Integer years;

    @Column(name = "twall")
    private Integer twall;

    @Column(name = "f")
    private Integer f;

    @Column(name = "a")
    private Integer a;

    public Integer getYear() {
        return years;
    }
    public Integer getTWAll() {
        return twall;
    }
    public Integer getF() {
        return f;
    }
    public Integer getA() {
        return a;
    }

}

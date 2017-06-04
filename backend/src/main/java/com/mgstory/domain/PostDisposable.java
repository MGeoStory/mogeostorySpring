package com.mgstory.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import java.io.Serializable;

@Entity
@Table(name = "disposable")
public class PostDisposable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "years")
    private Integer years;

    @Column(name = "cityid")
    private String cityId;

    @Column(name = "disposable")
    private Integer disposable;

    @Column(name = "save")
    private Integer save;

    @Column(name = "income")
    private Integer income;

    @Column(name = "consume")
    private Integer consume;

    @Column(name="nondisposable")
    private Integer nonDisposable;
    public Integer getYear() {
        return years;
    }

    public String getCityId() {
        return cityId;
    }

    public Integer getDisposable() {
        return disposable;
    }

    public Integer getSave() {
        return save;
    }

    public Integer getIncome() {
        return income;
    }

    public Integer getConsume() {
        return consume;
    }

        public Integer getNonDisposable() {
        return nonDisposable;
    }

    public PostDisposable(){
    }
}

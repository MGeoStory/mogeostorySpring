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

    @Column(name = "h")
    private Integer h;

    @Column(name = "l")
    private Integer l;

    @Column(name = "d")
    private Integer d;

    @Column(name = "e")
    private Integer e;

    @Column(name = "g")
    private Integer g;

    @Column(name = "j")
    private Integer j;

    @Column(name = "k")
    private Integer k;

    @Column(name = "n")
    private Integer n;

    @Column(name = "m")
    private Integer m;

    @Column(name = "p")
    private Integer p;

    @Column(name = "q")
    private Integer q;

    @Column(name = "t")
    private Integer t;

    @Column(name = "v")
    private Integer v;

    @Column(name = "u")
    private Integer u;

    @Column(name = "x")
    private Integer x;

    @Column(name = "c")
    private Integer c;

    @Column(name = "o")
    private Integer o;

    @Column(name = "i")
    private Integer i;

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

    public Integer getH() {
        return h;
    }

    public Integer getL() {
        return l;
    }

    public Integer getD() {
        return d;
    }

    public Integer getE() {
        return e;
    }

    public Integer getG() {
        return g;
    }

    public Integer getJ() {
        return j;
    }

    public Integer getK() {
        return k;
    }

    public Integer getN() {
        return n;
    }

    public Integer getM() {
        return m;
    }

    public Integer getP() {
        return p;
    }

    public Integer getQ() {
        return q;
    }

    public Integer getT() {
        return t;
    }

    public Integer getV() {
        return v;
    }

    public Integer getU() {
        return u;
    }

    public Integer getX() {
        return x;
    }

    public Integer getC() {
        return c;
    }

    public Integer getO() {
        return o;
    }

    public Integer getI() {
        return i;
    }
}

package com.procergs.rsp.opengraph;

import com.procergs.rsp.opengraph.ed.OpenGraphED;

import javax.persistence.EntityManager;

/**
 * Created by daniel-tavares on 01/03/16.
 */
public class OpenGraphBd {
  EntityManager em;

  public OpenGraphBd(EntityManager em) {
    this.em = em;
  }

  public void insert(OpenGraphED openGraphED) {
    em.persist(openGraphED);
  }
}

package com.flight_app.admin_service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link AdminServiceApplication}.
 */
@Generated
public class AdminServiceApplication__BeanDefinitions {
  /**
   * Get the bean definition for 'adminServiceApplication'.
   */
  public static BeanDefinition getAdminServiceApplicationBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(AdminServiceApplication.class);
    beanDefinition.setInstanceSupplier(AdminServiceApplication::new);
    return beanDefinition;
  }
}

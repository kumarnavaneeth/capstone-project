package com.flight_app.admin_service.repository;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link AdminRepository}.
 */
@Generated
public class AdminRepository__BeanDefinitions {
  /**
   * Get the bean definition for 'adminRepository'.
   */
  public static BeanDefinition getAdminRepositoryBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(AdminRepository.class);
    beanDefinition.setInstanceSupplier(AdminRepository::new);
    return beanDefinition;
  }
}

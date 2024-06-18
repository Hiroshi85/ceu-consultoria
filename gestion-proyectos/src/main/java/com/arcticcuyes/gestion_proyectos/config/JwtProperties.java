package com.arcticcuyes.gestion_proyectos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@Configuration
@PropertySources({
    @PropertySource("classpath:jwt.properties")
})
public class JwtProperties {

}

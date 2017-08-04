/*
 * Copyright (c) 2017 dtrouillet
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *  Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package fr.trouillet.faya.fayabank.config;


import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.ApplicationContextException;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class HerokuDatabaseConfiguration implements EnvironmentAware {

    private final Logger log = LoggerFactory.getLogger(HerokuDatabaseConfiguration.class);

    private RelaxedPropertyResolver propertyResolver;

    private Environment environment;

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
        this.propertyResolver = new RelaxedPropertyResolver(environment, "spring.datasource.");
    }

    @Bean
    public DataSource dataSource() {
        log.debug("Configuring Heroku Datasource");

        String herokuUrl = propertyResolver.getProperty("heroku-url");
        if (herokuUrl != null) {
            log.info("Using Heroku, parsing their $DATABASE_URL to use it with JDBC");
            URI dbUri = null;
            try {
                dbUri = new URI(herokuUrl);
            } catch (URISyntaxException e) {
                throw new ApplicationContextException("Heroku database connection pool is not configured correctly");
            }
            String username = dbUri.getUserInfo().split(":")[0];
            String password = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:postgresql://" +
                dbUri.getHost() +
                ':' +
                dbUri.getPort() +
                dbUri.getPath() +
                "?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

            HikariConfig config = new HikariConfig();
            config.setDataSourceClassName(propertyResolver.getProperty("dataSourceClassName"));
            config.addDataSourceProperty("url", dbUrl);
            config.addDataSourceProperty("user", username);
            config.addDataSourceProperty("password", password);
            return new HikariDataSource(config);
        } else {
            throw new ApplicationContextException("Heroku database URL is not configured, you must set --spring.datasource.heroku-url=$DATABASE_URL");
        }
    }
}

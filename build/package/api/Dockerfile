FROM php:8.1-apache as base

RUN apt-get update && \
    apt-get install -y --no-install-recommends git unzip libzip-dev libcurl4-openssl-dev pkg-config libssl-dev && \
    pecl install mongodb && \
    docker-php-ext-enable mongodb && \
    docker-php-ext-install mysqli pdo pdo_mysql zip && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    a2enmod rewrite && a2enmod headers

FROM base as development

## Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

## Install symfony cli
RUN curl -sS https://get.symfony.com/cli/installer | bash

RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony
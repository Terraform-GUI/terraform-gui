## Vars

EXEC_PHP					= php
CONSOLE						= $(EXEC_PHP) bin/console
COMPOSER					= composer
YARN							= yarn
SYMFONY						= symfony
DOCKER_COMPOSE		= docker-compose
PHP_VERSION 			= 8.1
BREW 							= brew

link-php:
	$(BREW) unlink php@$$(php -r "echo PHP_VERSION;" | cut -c1-3)
	$(BREW) link --force php@$(PHP_VERSION)

start:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

fix:
	php-cs-fixer fix src
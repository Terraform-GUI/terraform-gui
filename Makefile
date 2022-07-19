## Vars

EXEC_PHP					= php
CONSOLE						= $(EXEC_PHP) bin/console
COMPOSER					= composer
YARN							= yarn
SYMFONY						= symfony
DOCKER_COMPOSE		= docker-compose
PHP_VERSION 			= 8.1
BREW 							= brew

start:
	$(DOCKER_COMPOSE) up --build -d

stop:
	$(DOCKER_COMPOSE) down

fix:
	php-cs-fixer fix src
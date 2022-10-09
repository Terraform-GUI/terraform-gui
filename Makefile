
# VARIABLES

COMPOSER					       = composer
YARN							       = yarn
SYMFONY						       = symfony
PHP_VERSION 			       = 8.1
BREW 							       = brew
PHP_CONTAINER_SERVICE    = api
EXEC_PHP                 = exec $(PHP_CONTAINER_SERVICE) bash -c 
DOCKER_COMPOSE		       = docker-compose


# COMMANDS

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Up the docker-compose without cache or orphans
	docker-compose up \
		--build \
		--detach

stop: ## Down the docker-compose 
	docker-compose down

logs: ## Display logs of your containers 
	docker-compose logs --follow

reload:
	make stop start logs

api-test:
	$(DOCKER_COMPOSE) $(EXEC_PHP) "php bin/console cache:clear"

api-setup:
	$(DOCKER_COMPOSE) $(EXEC_PHP) "composer install"
	$(DOCKER_COMPOSE) $(EXEC_PHP) "php bin/console lexik:jwt:generate-keypair --skip-if-exists"
	php api/vendor/bin/grumphp git:init --config='./api/grumphp.yml'


api-fix:
	$(DOCKER_COMPOSE) $(EXEC_PHP) "vendor/bin/php-cs-fixer fix src"

init:
	make api-setup start logs

.PHONY: help


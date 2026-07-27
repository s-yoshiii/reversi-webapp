.PHONY: up down stop logs connect-mysql init-db

up:
	docker-compose up -d

down:
	docker-compose down

stop:
	docker-compose stop

logs:
	docker-compose logs -f

connect-mysql:
	./bin/connect_mysql.sh

init-db:
	docker-compose exec -T mysql mysql -uroot -prootpassword < mysql/init.sql

FROM mysql:5.7

EXPOSE 3306

ADD . /docker-entrypoint-initdb.d

CMD [ "mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci" ]
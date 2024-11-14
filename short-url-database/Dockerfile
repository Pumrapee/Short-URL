FROM mysql/mysql-server

ENV MYSQL_RANDOM_ROOT_PASSWORD=true
ENV TZ=UTC

COPY scripts/ /docker-entrypoint-initdb.d/
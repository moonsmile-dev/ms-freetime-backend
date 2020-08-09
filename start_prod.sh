export `cat environments/prod.env| xargs`

docker-compose -f docker-compose.prod.yml build
docker stack deploy -c docker-compose.prod.yml ms-free
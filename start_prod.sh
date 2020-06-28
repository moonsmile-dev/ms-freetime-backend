export `cat environments/prod.env| xargs`

docker-compose -f docker-compose.deploy.yml build
docker stack deploy -c docker-compose.deploy.yml ms-free
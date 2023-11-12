docker build -t jnuttall-resume .
docker run --rm -i --user="$(id -u):$(id -g)" -v `pwd`:/data jnuttall-resume $@
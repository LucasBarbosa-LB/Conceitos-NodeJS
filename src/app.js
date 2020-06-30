const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//List All Repositories ok
app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

//Create New Repository ok
app.post("/repositories", (request, response) => {
   const {title, url, techs} = request.body;

   const repository = {
     id: uuid(),
     title, 
     url,
     techs,
     likes: 0,
   };

   repositories.push(repository);
   return response.json(repository);

});

//Update Repository
app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json();
  }

    const updatedRepository = { 
      ...repositories[repositoryIndex],
      title, 
      url,
      techs
  };

  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

//Crete New Like ok
app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repository = repositories.find( repository => repository.id === id);
  

  if(!repository){
    return response.status(400).json({ error: 'Project not found'})
}

  repository.likes ++;

  return response.json(repository);
});

//Delete Repository. ok
app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

    if(repositoryIndex < 0){
      return response.status(400).json({ error: 'Project not found'})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
   
});



module.exports = app;

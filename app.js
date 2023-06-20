/*******************************************************************************************
 * Objetivo: API para interagir com o Banco de Dados (GET, POST, DELETE, PUT)
 * Autor: Evellyn da Silva
 * Versão: 1.0
 ********************************************************************************************/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { request, response } = require("express");

const app = express();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");

  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  app.use(cors());

  next();
});

const bodyJSON = bodyParser.json();

const animalController = require("./controller/animal-controller.js");
var message = require("./controller/module/config.js");

//EndPoint: Retorna todos os pets
app.get("/v1/pet-paradise/pets", cors(), async function (request, response) {
  let data = await animalController.findAllAnimals();
  console.log(data);

  response.status(data.status);
  response.json(data);
});

//EndPoint: Retorna dados do pet pelo ID
app.get(
  "/v1/pet-paradise/pets/:id",
  cors(),
  async function (request, response) {
    let animalId = request.params.id;
    console.log(animalId);

    let data = await animalController.findAnimalById(animalId);
    console.log(data);

    response.status(data.status);
    response.json(data);
  }
);

//EndPoint: Exclui um pet pelo ID
app.delete(
  "/v1/pet-paradise/pets/:id",
  cors(),
  async function (request, response) {
    let animalId = request.params.id;

    let resultDelete = await animalController.deleteAnimalById(animalId);

    response.status(resultDelete.status);
    response.json(resultDelete);
  }
);

//EndPoint: Atualiza um pet pelo ID
app.put(
  "/v1/pet-paradise/pets/:id",
  cors(),
  bodyJSON,
  async function (request, response) {
    let animalId = request.params.id;
    let animalData = request.body;

    let resultUpdate = await animalController.updateAnimalById(
      animalId,
      animalData
    );

    console.log("result update: ", resultUpdate);

    response.status(resultUpdate.status);
    response.json(resultUpdate);
  }
);

app.post(
  "/v1/pet-paradise/pet",
  cors(),
  bodyJSON,
  async function (request, response) {
    let animalData = request.body;

    let resultInsert = await animalController.insertAnimal(animalData);

    response.status(resultInsert.status);
    response.json(resultInsert);
  }
);

app.listen(8080, function () {
  console.log("Servidor aguardando requisições na porta 8080");
});

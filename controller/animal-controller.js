/*******************************************************************************************
 * Objetivo: Implementa a regra de negócio entre o app e a model
 * Autor: Evellyn da Silva
 * Versão: 1.0
 ********************************************************************************************/

var animalDAO = require("../model/DAO/animalDAO.js");

var message = require("./module/config.js");

const findAllAnimals = async function () {
  let animalData = await animalDAO.findAllAnimals();

  let jsonData = {};

  if (animalData) {
    jsonData.status = 200;
    jsonData.count = animalData.length;
    jsonData.animals = animalData;
    return jsonData;
  } else {
    return message.ERROR_NOT_FOUND;
  }
};

const findAnimalById = async function (animalId) {
  if (animalId == "" || animalId == undefined || isNaN(animalId))
    return message.ERROR_REQUIRED_ID;
  else {
    let animalData = await animalDAO.findAnimalById(animalId);

    let jsonData = {};

    if (animalData) {
      jsonData.status = 200;
      jsonData.animal = animalData;
      return jsonData;
    } else {
      return message.ERROR_NOT_FOUND;
    }
  }
};

const deleteAnimalById = async function (animalId) {
  if (animalId == "" || animalId == undefined || isNaN(animalId)) {
    return message.ERROR_REQUIRED_ID;
  } else {
    let status = await animalDAO.deleteAnimalById(animalId);

    if (status) return message.DELETED_ITEM;
    else return message.ERROR_INTERNAL_SERVER;
  }
};

const updateAnimalById = async function (animalId, animalData) {
  console.log("animal data controlelr: ", animalData);
  console.log("animal ID controlelr: ", animalId);

  if (
    animalData.name == "" ||
    animalData.name == undefined ||
    animalData.name.length > 30 ||
    animalData.age == "" ||
    animalData.age == undefined ||
    isNaN(animalData.age)
  ) {
    return message.ERROR_REQUIRED_DATA;
  } else if (animalId == "" || animalId == undefined || isNaN(animalId)) {
    return message.ERROR_REQUIRED_ID;
  } else {
    let status = await animalDAO.updateAnimalById(animalId, animalData);
    console.log("status: ", status);

    if (status) return message.UPDATED_ITEM;
    else return message.ERROR_INTERNAL_SERVER;
  }
};

const insertAnimal = async function (animalData) {
  if (
    animalData.name == "" ||
    animalData.name == undefined ||
    animalData.name.length > 30 ||
    animalData.age == "" ||
    animalData.age == undefined ||
    isNaN(animalData.age)
  ) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await animalDAO.insertAnimal(animalData);
    console.log("status: ", status);

    if (status) return message.UPDATED_ITEM;
    else return message.ERROR_INTERNAL_SERVER;
  }
};

module.exports = {
  findAllAnimals,
  findAnimalById,
  deleteAnimalById,
  updateAnimalById,
  insertAnimal,
};

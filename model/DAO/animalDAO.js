/*******************************************************************************************
 * Objetivo: Realizar a interação do Animal com o Banco de Dados
 * Autor: Evellyn da Silva
 * Versão: 1.0
 ********************************************************************************************/

var { PrismaClient } = require("@prisma/client");

var prisma = new PrismaClient();

const findAllAnimals = async function () {
  let sql = `
  SELECT tbl_animal.id, tbl_animal.nome, tbl_animal.idade, tbl_animal.foto, tbl_animal.descricao, tbl_especie.especie, tbl_cor.cor, tbl_genero.genero, tbl_tamanho.tamanho
  FROM tbl_animal
  INNER JOIN tbl_especie ON tbl_animal.id_especie = tbl_especie.id
  INNER JOIN tbl_cor ON tbl_animal.id_cor = tbl_cor.id
  INNER JOIN tbl_genero ON tbl_animal.id_genero = tbl_genero.id
  INNER JOIN tbl_tamanho ON tbl_animal.id_tamanho = tbl_tamanho.id;
  `;

  let responseAnimal = await prisma.$queryRawUnsafe(sql);

  if (responseAnimal.length > 0) {
    return responseAnimal;
  } else {
    return false;
  }
};

const findAnimalById = async function (animalId) {
  let sql = `
  SELECT tbl_animal.id, tbl_animal.nome, tbl_animal.idade, tbl_animal.foto, tbl_animal.descricao, tbl_especie.especie, tbl_cor.cor, tbl_genero.genero, tbl_tamanho.tamanho
  FROM tbl_animal
  INNER JOIN tbl_especie ON tbl_animal.id_especie = tbl_especie.id
  INNER JOIN tbl_cor ON tbl_animal.id_cor = tbl_cor.id
  INNER JOIN tbl_genero ON tbl_animal.id_genero = tbl_genero.id
  INNER JOIN tbl_tamanho ON tbl_animal.id_tamanho = tbl_tamanho.id
  WHERE tbl_animal.id = ${animalId};
  `;

  let responseAnimal = await prisma.$queryRawUnsafe(sql);

  if (responseAnimal.length > 0) {
    return responseAnimal;
  } else {
    return false;
  }
};

const deleteAnimalById = async function (animalId) {
  let sql = `DELETE FROM tbl_animal WHERE id = ${animalId};`;

  let result = await prisma.$executeRawUnsafe(sql);

  if (result) {
    return true;
  } else {
    return false;
  }
};

const updateAnimalById = async function (animalId, animalData) {
  let animalSpecie = await getSpecieIdByName(animalData.specie);
  let animalColor = await getColorIdByName(animalData.color);
  let animalGender = await getGenderIdByName(animalData.gender);
  let animalSize = await getSizeIdByName(animalData.size);

  let sql = ` UPDATE tbl_animal 
              SET
              nome = '${animalData.name}', 
              idade = ${animalData.age},
              foto = '${animalData.photo}',
              descricao = '${animalData.description}',
              id_especie = ${animalSpecie},
              id_cor = ${animalColor},
              id_genero = ${animalGender},
              id_tamanho = ${animalSize}
              WHERE id = ${animalId};
            `;

  let result = await prisma.$executeRawUnsafe(sql);

  if (result) {
    return true;
  } else {
    return false;
  }
};

const insertAnimal = async function (animalData) {
  let animalSpecie = await getSpecieIdByName(animalData.specie);
  let animalColor = await getColorIdByName(animalData.color);
  let animalGender = await getGenderIdByName(animalData.gender);
  let animalSize = await getSizeIdByName(animalData.size);

  let sql = `INSERT INTO tbl_animal 
            (nome, idade, foto, descricao, id_especie, id_cor, id_tamanho, id_genero) 
            VALUES (
              '${animalData.name}', 
              ${animalData.age}, 
              '${animalData.photo}', 
              '${animalData.description}', 
              ${animalSpecie}, 
              ${animalColor}, 
              ${animalSize}, 
              ${animalGender}
              );
            `;

  let result = await prisma.$executeRawUnsafe(sql);

  if (result) {
    return true;
  } else {
    return false;
  }
};

const getSpecieIdByName = async function (specieName) {
  const query = `SELECT id FROM tbl_especie WHERE especie = '${specieName.toLowerCase()}';`;
  const result = await prisma.$queryRawUnsafe(query);

  if (result && result.length > 0) {
    return result[0].id;
  } else {
    return null;
  }
};

const getColorIdByName = async function (colorName) {
  const query = `SELECT id FROM tbl_cor WHERE cor = '${colorName.toLowerCase()}';`;
  const result = await prisma.$queryRawUnsafe(query);

  if (result && result.length > 0) {
    return result[0].id;
  } else {
    return null;
  }
};

const getGenderIdByName = async function (genderName) {
  const query = `SELECT id FROM tbl_genero WHERE genero = '${genderName.toLowerCase()}';`;
  const result = await prisma.$queryRawUnsafe(query);

  if (result && result.length > 0) {
    return result[0].id;
  } else {
    return null;
  }
};

const getSizeIdByName = async function (sizeName) {
  const query = `SELECT id FROM tbl_tamanho WHERE tamanho = '${sizeName.toLowerCase()}';`;
  const result = await prisma.$queryRawUnsafe(query);

  if (result && result.length > 0) {
    return result[0].id;
  } else {
    return null;
  }
};

module.exports = {
  findAllAnimals,
  findAnimalById,
  deleteAnimalById,
  updateAnimalById,
  insertAnimal
};

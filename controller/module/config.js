/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas variáveis, constantes e funções globais do projeto
 * Autor: Evellyn da Silva
 * Versão: 1.0 
********************************************************************************************/

/******************************* CONSTANTES DE ERROS *************************************/
const ERROR_REQUIRED_DATA = {status: 400, message: 'Existem dados obrigatórios que não foram preenchidos.'};
const ERROR_REQUIRED_ID = {status: 400, message: 'O atributo ID é obrigatório na requisição obrigatórios que não foram preenchidos.'};
const ERROR_NOT_FOUND = {status: 404, message: 'Nenhum registro encontrado na requisição.'};
const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O tipo de mídia Content-Type da solicitação não é conpatível com o servidor, [aplication/json]'};
const ERROR_INTERNAL_SERVER = {status: 500, message: 'Existem dados obrigatórios que não foram preenchidos.'};

/******************************** CONSTANTES DE SUCESSO *************************************/
const CREATED_ITEM = {status: 201, message: 'Registro criado com sucesso.'}
const UPDATED_ITEM = {status: 200, message: 'Registro atualizado com sucesso.'}
const DELETED_ITEM = {status: 200, message: 'Registro deletado com sucesso.'}

module.exports = {
    ERROR_REQUIRED_DATA,
    ERROR_REQUIRED_ID, 
    ERROR_INTERNAL_SERVER, 
    CREATED_ITEM, 
    UPDATED_ITEM,
    DELETED_ITEM, 
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_NOT_FOUND
}
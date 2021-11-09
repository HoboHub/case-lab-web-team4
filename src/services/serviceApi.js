import axios from 'axios';

export default class ServiceApi {
  /**
   * Конфигурация аxios
   * Конфиг для студента по дефолту
   * @static
   * @property {Object} rosatom - конфигурация аxios для сервера росатом
   */
  static api = {
    rosatom: axios.create({
      baseURL: 'https://tml9.rosatom.ru/api/',
    }),
  };

  /**
   * Пост-запрос
   * @static
   * @async
   * @param {String} serviceName - название сервиса (ключ объекта api)
   * @param {Object} url - url запроса
   * @param {Object} postData - тело пост-запроса
   * @param {Object} reqConfig - хедеры запроса
   * @returns {Object}
   */
  static async post(serviceName = 'rosatom', url = '', postData = {}, reqConfig = {}) {
    try {
      const response = await this.api[serviceName].post(url, postData, reqConfig);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async get(serviceName = 'rosatom', url = '', preqConfig = {}) {
    try {
      const response = await this.api[serviceName].get(url, preqConfig);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async put(serviceName = 'rosatom', url = '', postData = {}, reqConfig = {}) {
    try {
      const response = await this.api[serviceName].put(url, postData, reqConfig);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(serviceName = 'rosatom', url = '', preqConfig = {}) {
    try {
      const response = await this.api[serviceName].delete(url, preqConfig);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

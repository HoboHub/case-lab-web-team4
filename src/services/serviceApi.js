import axios from 'axios';

export default class ServiceApi {
  constructor() {
    this.tokens = {
      student: '0k8ks8o8ssgo8sksk8kw8okcgggcwswog0s8kwk4',
      teacher: 'kw84c0kkwwkk4wockss8k0ko00wwo08w8wc4g8gs',
    };
  }

  /**
   * Конфигурация аxios
   * Конфиг для студента по дефолту
   * @static
   * @property {Object} rosatom - конфигурация аxios для сервера росатом
   */
  static api = {
    rosatom: axios.create({
      baseURL: 'https://tml9.rosatom.ru/api/',
      headers: { 'X-API-KEY': '0k8ks8o8ssgo8sksk8kw8okcgggcwswog0s8kwk4' },
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
  // eslint-disable-next-line consistent-return
  static async post(serviceName = 'rosatom', url = '', postData = {}, reqConfig = {}) {
    try {
      const response = await this.api[serviceName].post(url, postData, reqConfig);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async get(serviceName = 'rosatom', url = '', preqConfig = {}) {
    try {
      const response = await this.api[serviceName].get(url, preqConfig);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async put(serviceName = 'rosatom', url = '', postData = {}, reqConfig = {}) {
    try {
      const response = await this.api[serviceName].put(url, postData, reqConfig);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async delete(serviceName = 'rosatom', url = '', preqConfig = {}) {
    try {
      const response = await this.api[serviceName].delete(url, preqConfig);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

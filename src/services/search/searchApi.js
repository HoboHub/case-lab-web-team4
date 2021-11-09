import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class Search {
  // eslint-disable-next-line consistent-return
  static async getUsers(q, department, company, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    if (q && department) {
      const response = await serviceApi.get('rosatom', `/search/users/?q=${q}&department=${department}&company=${company}`, headers);
      return response;
    }
    if (q || !department) {
      const response = await serviceApi.get('rosatom', `/search/users/?q=${q}&company=${company}`, headers);
      return response;
    }
    if (!q) {
      const response = await serviceApi.get('rosatom', `/search/users/?department=${department}&company=${company}`, headers);
      return response;
    }
  }

  // eslint-disable-next-line consistent-return
  static async getCourses(q, userRole) {
    const headers = {};
    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    if (q) {
      const response = await serviceApi.get('rosatom', `/search/courses/?q=${q}`, headers);
      return response;
    }
  }

  // eslint-disable-next-line consistent-return
  static async getEvents(q, userRole) {
    const headers = {};
    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    if (q) {
      const response = await serviceApi.get('rosatom', `/search/events/?q=${q}`, headers);
      return response;
    }
  }
}

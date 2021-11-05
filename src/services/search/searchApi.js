import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class Search {
  static async getUsers(userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    const response = await serviceApi.get('rosatom', '/search/users', headers);
    return response;
  }
}

import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class CorporationApi {
  static async fetchDepartments(userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    const response = await serviceApi.get('rosatom', '/corporation/departments', headers);
    return response;
  }

  static async fetchCompanies(department, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    const response = await serviceApi.get('rosatom', `corporation/companies?department=${department}`, {
      headers: {
        'X-API-KEY': tokens.teacher,
      },
    });

    return response;
  }
}

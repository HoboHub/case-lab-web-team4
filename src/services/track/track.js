import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class Track {
  static async getTracks(userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    if (userRole === 'student') {
      headers.headers = { 'X-API-KEY': tokens.student };
    }
    try {
      const response = await serviceApi.get('rosatom', '/tracks', headers);
      return response;
    } catch (err) {
      console.log('Error getting tracks ', err);
    }
  }

  static async getTrackById(trackId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    if (userRole === 'student') {
      headers.headers = { 'X-API-KEY': tokens.student };
    }

    try {
      const response = await serviceApi.get('rosatom', `track/${trackId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async createTrack(track, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    const response = await serviceApi.post('rosatom', 'track/', track, headers);
    return response;
  }

  static async uploadImage(image, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = {
        'X-API-KEY': tokens.teacher,
        'Content-Type': 'multipart/form-data',
      };
    }
    debugger;
    try {
      const response = await serviceApi.post('rosatom', 'track/preview', image, headers);
      console.log(response);
      return response.data.file.url;
    } catch (error) {
      console.log(error);
    }
  }

  static async changeTrack(trackId, data, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    const response = await serviceApi.put('rosatom', `track/${trackId}`, data, headers);
    return response;
  }

  static async removeTrack(trackId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.delete('rosatom', `track/${trackId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static assignTrack(trackId, userId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    try {
      serviceApi.post('rosatom', `track/${trackId}/trackAssigns`, [{ userId }], headers);
    } catch (error) {
      console.log(`Error assigning user ${userId} to track ${trackId}`, error);
    }
  }
}

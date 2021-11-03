import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class Track {
  // eslint-disable-next-line consistent-return
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

  // eslint-disable-next-line consistent-return
  static async createTrack(track, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.post('rosatom', 'track/', track, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
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

  // eslint-disable-next-line consistent-return
  static async changeTrack(trackId, track, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.put('rosatom', `track/${trackId}`, track, headers);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
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
}

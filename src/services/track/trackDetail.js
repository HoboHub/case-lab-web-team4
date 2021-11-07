import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class TrackDetail {
  // eslint-disable-next-line consistent-return
  static async getTrackDetail(trackId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    if (userRole === 'student') {
      headers.headers = { 'X-API-KEY': tokens.student };
    }

    try {
      const response = await serviceApi.get('rosatom', `track/${trackId}/details`, headers);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  static async removeTrackItem(itemId, userRole) {
    const headers = {};

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    try {
      const response = await serviceApi.delete('rosatom', `track/detail/${itemId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

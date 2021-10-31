import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class TrackDetail {
  // eslint-disable-next-line consistent-return
  static async getTrackDetail(trackId, userRole) {
    const headers = {};

    console.log(userRole);

    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    if (userRole === 'student') {
      headers.headers = { 'X-API-KEY': tokens.student };
    }

    try {
      //   const response = await getDetails();
      const response = await serviceApi.get('rosatom', `track/${trackId}/details`, headers);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

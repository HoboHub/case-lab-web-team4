import serviceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default class TrackDetail {
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

  static async addDetailToTrack(trackId, detailData, userRole) {
    const headers = {};
    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    try {
      const response = await serviceApi.post('rosatom', `track/${trackId}/detail`, detailData, headers);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async changeTrackDetailData(detailId, newData, userRole) {
    const headers = {};
    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }

    const response = await serviceApi.put('rosatom', `track/detail/${detailId}`, newData, headers);
    return response;
  }

  static async removeTrackDetail(detailId, userRole) {
    const headers = {};
    if (userRole === 'teacher') {
      headers.headers = { 'X-API-KEY': tokens.teacher };
    }
    try {
      const response = await serviceApi.delete('rosatom', `track/detail/${detailId}`, headers);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

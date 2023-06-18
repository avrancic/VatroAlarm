import axios from 'axios';

class MapDataService {
  get(array) {
    return axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          format: 'jsonv2',
          lat: array[1],
          lon: array[0],
        },
      });
  }
}

export default new MapDataService();
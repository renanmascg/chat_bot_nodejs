import axios, { AxiosInstance } from 'axios';

class CustomApiRequest {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://stooq.com/q/l/?s=aapl.us&f=sd2t2ohlcv&h&e=csv',
      params: {
        f: 'sd2t2ohlcv',
        h: '',
        e: 'csv',
      },
      responseType: 'blob',
    });
  }
}

export default CustomApiRequest;

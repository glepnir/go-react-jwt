import axios, { AxiosInstance } from 'axios';
import { message } from 'antd';

const instance: AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export default function request(url: string, data: object, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === 'GET') {
      promise = instance.get(url, {
        params: data,
        method: type,
      });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error(`Request Wrong:${error}`);
        reject(error);
      });
  });
}

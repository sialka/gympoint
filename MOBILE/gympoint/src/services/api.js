import axios from 'axios';

const api = axios.create({
  // ios localhost:3333
  // android emulator 10.0.2.2:3333
  // android genymotion 10.0.3.2:3333
  // via usb 192.168.15.13:3333 (ip da rede)
  baseURL: 'http://192.168.15.19:3333',
});

export default api;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://realspace-otq5wtkqba-uc.a.run.app',
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const response = await axios.post('https://realspace-otq5wtkqba-uc.a.run.app/auth/refresh', null, {
          headers: { Cookie: `refresh_token=${refreshToken}` },
        });

        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
          const accessTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('access_token='));
          const refreshTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('refresh_token='));

          if (accessTokenCookie && refreshTokenCookie) {
            const newAccessToken = accessTokenCookie.split(';')[0].split('=')[1];
            const newRefreshToken = refreshTokenCookie.split(';')[0].split('=')[1];

            await AsyncStorage.setItem('access_token', newAccessToken);
            await AsyncStorage.setItem('refresh_token', newRefreshToken);

            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        }
      } catch (err) {
        console.error('Error refreshing token:', err);
      }
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;

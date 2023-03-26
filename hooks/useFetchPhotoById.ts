import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_TOKEN, API_URL } from '@env';
import { PhotoFull } from '../types/models/PhotoFull';
import { LoadingStatus } from '../store/slices/photos';

export const useFetchPhotoById = (id: string) => {
  const [photo, setPhoto] = useState<PhotoFull>();
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setStatus(LoadingStatus.PENDING);
        const { data } = await axios.get(`${API_URL}/photos/${id}`, {
          params: { client_id: API_TOKEN },
        });
        setPhoto(data);
        setStatus(LoadingStatus.SUCCEEDED);
      } catch (error) {
        setStatus(LoadingStatus.FAILE);
      }
    };
    fetchPhoto();
  }, []);

  return { photo, status };
};

import { useState } from 'react';
import { fetchPhotos } from '../store/slices/photos';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useFetchPhotos = (per_page: number) => {
  const dispatch = useAppDispatch();
  const { items, loading, total } = useAppSelector(state => state.photos);
  const [page, setPage] = useState(0);

  return {
    photos: {
      items,
      loading,
      total,
      page,
    },
    loadMorePhotos: () => {
      dispatch(fetchPhotos({ page: page + 1, per_page }));
      setPage(page + 1);
    },
  };
};

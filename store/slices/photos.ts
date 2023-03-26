import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PhotoPreview } from '../../types/models/PhotoPreview';
import { API_TOKEN, API_URL } from '@env';
import axios from 'axios';

interface fetchPhotosArgs {
  per_page: number;
  page: number;
}

interface Returned {
  items: PhotoPreview[];
  total: number;
}

export const fetchPhotos = createAsyncThunk(
  'users/fetchPhotos',
  async ({ per_page, page }: fetchPhotosArgs) => {
    const { data, headers } = await axios.get(`${API_URL}/photos`, {
      params: { client_id: API_TOKEN, per_page, page },
    });

    return { items: data, total: headers['x-total'] } as Returned;
  },
);

export enum LoadingStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILE = 'failed',
}

interface PhotosState {
  items: PhotoPreview[];
  loading: LoadingStatus;
  total: number;
}

const initialState: PhotosState = {
  items: [],
  loading: LoadingStatus.IDLE,
  total: 0,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    cleanPhotos(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPhotos.pending, state => {
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.total = action.payload.total;
      state.loading = LoadingStatus.SUCCEEDED;
    });
    builder.addCase(fetchPhotos.rejected, state => {
      state.loading = LoadingStatus.FAILE;
    });
  },
});

export const { cleanPhotos } = photosSlice.actions;
export default photosSlice.reducer;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFetchPhotoById } from '../hooks/useFetchPhotoById';
import { RootStackParamList } from '../types/models/RootStackParamList';
import { Image } from 'react-native';
import { LoadingStatus } from '../store/slices/photos';
import { useGetImageSize } from '../hooks/useGetImageSize';

type GalleryProps = NativeStackScreenProps<RootStackParamList, 'Photo'>;

const Photo = ({ route }: GalleryProps) => {
  const { photoId } = route.params;
  const { photo, status } = useFetchPhotoById(photoId);
  const { width, height } = useGetImageSize(photo?.urls.full || '');

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {status === LoadingStatus.SUCCEEDED && (
        <Image
          source={{ uri: photo?.urls.full }}
          style={{ width: width, height: height }}
        />
      )}
    </View>
  );
};

export default Photo;

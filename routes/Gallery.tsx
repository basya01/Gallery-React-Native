import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { cleanPhotos, LoadingStatus } from '../store/slices/photos';
import { RootStackParamList } from '../types/models/RootStackParamList';

type GalleryProps = NativeStackScreenProps<RootStackParamList, 'Gallery'>;

const Gallery = ({ navigation }: GalleryProps) => {
  const dispatch = useAppDispatch();
  const perPage = 12;
  const { photos, loadMorePhotos } = useFetchPhotos(perPage);
  useEffect(() => {
    loadMorePhotos();

    return () => {
      dispatch(cleanPhotos());
    };
  }, []);

  const onEndImageList = () => {
    if (photos.total <= photos.page) {
      return;
    }
    loadMorePhotos();
  };

  const onPressPhoto = (id: string) => {
    navigation.navigate('Photo', { photoId: id });
  };

  return (
    <>
      <View style={styles.gallery}>
        <FlatList
          style={{}}
          data={photos.items}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onPressPhoto(item.id)}
              key={item.id}>
              <Image source={{ uri: item.urls.small }} style={styles.photo} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          onEndReached={onEndImageList}
          ListFooterComponent={
            photos.loading === LoadingStatus.PENDING ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#0000ff"
              />
            ) : null
          }
        />
        {photos.loading === LoadingStatus.FAILE && (
          <Text>Error, photos not received</Text>
        )}
      </View>
    </>
  );
};

const styles = {
  gallery: {
    marginTop: 5,
    flex: 2, // the number of columns you want to devide the screen into
    marginHorizontal: 'auto',
    width: '100%',
  },
  item: {
    padding: 4,
    flex: 1,
    maxWidth: '100%', // 100% devided by the number of rows you want
    aspectRatio: 1,
  },
  photo: {
    maxWidth: '100%', // 100% devided by the number of rows you want
    aspectRatio: 1,
  },
  loader: { marginTop: 20, marginBottom: 20 },
};

export default Gallery;

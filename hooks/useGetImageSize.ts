import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

export const useGetImageSize = (
  url: string,
  width = Dimensions.get('window').width,
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(url, (w, h) => {
      const newHeight = (h * width) / w;
      setSize({ width, height: newHeight });
    });
  }, [url]);

  return size;
};

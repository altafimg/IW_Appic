import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import {ActivityIndicator} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const VideoThumbnail = ({videoUrl}) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createThumbnail({url: videoUrl})
      .then(response => {
        setThumbnail(response.path);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error generating thumbnail:', err);
        setLoading(false);
      });
  }, [videoUrl]);

  return (
    <View style={styles.thumbnailContainer}>
      {loading ? (
        <ActivityIndicator
          size="small"
          style={{
            borderColor: 'gray',
            borderWidth: 0.5,
            padding: 20,
            borderRadius: 10,
          }}
        />
      ) : (
        <Image source={{uri: thumbnail}} style={styles.thumbnail} />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50@s',
    height: '50@s',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: '5@s',
  },
});

export default VideoThumbnail;

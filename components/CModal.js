import { View, Text, Pressable, StyleSheet, Image, Animated, Dimensions, ScrollView, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Loader } from './util';


import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av'
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/Playercontext';


const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
const deviceHeight = Dimensions.get('window').height;

export default function CModal(props) {
  const { object } = props;
  const { isModalVisible, setIsModalVisible } = useContext(PlayerContext);
  const { record, setRecord } = useContext(PlayerContext);
  const { docked, setDocked } = useContext(PlayerContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [durationMillis, setDurationMillis] = useState(1);
  const [positionMillis, setPositionMillis] = useState(0);

  // handle android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isModalVisible) {
        if (isPlaying) {
          if (!docked) {
            handleDock(true);
            return true;
          }
        } else {
          handleOnClose();
          return true;
        }
      } 
    })
    return () => backHandler.remove()
  }, [isModalVisible, isPlaying, docked, record])


  const handlePlayPause = async () => {
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
    setIsPlaying(!isPlaying);
  }

  const onSlidingComplete = (value) => {
    playbackInstance.setPositionAsync(value);
  }

  const handleStop = async () => {
    setIsPlaying(false);
    if (playbackInstance) {
      await playbackInstance.stopAsync();
    }
  }

  const handlePreviousTrack = async () => {
    if (playbackInstance) {
      // let ci = currentIndex;
      // await playbackInstance.unloadAsync();
      // currentIndex < audioBookPlaylist.length - 1 ? (ci -= 1) : (ci = 0)
      // setCurrentIndex(ci);
      // loadAudio();
      playbackInstance.setPositionAsync(positionMillis - 10000);
    }
  }

  const handleNextTrack = async () => {
    if (playbackInstance) {
      playbackInstance.setPositionAsync(positionMillis + 10000);

    }
  }

  loadAudio = async () => {
    if (!record.audio) return;

    if (playbackInstance) handleStop();
    try {
      const playbackInstance = new Audio.Sound()
      const source = {
        uri: record.audio
      }

      const status = {
        shouldPlay: isPlaying,
        volume
      }

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      setIsLoading(true);
      await playbackInstance.loadAsync(source, status, false);
      setIsLoading(false);

      setPlaybackInstance(playbackInstance);
    } catch (e) {
      console.log(e);
      alert('حدث خطآ ما٫ الرجاء المحاولة مره اخرى');
      setIsLoading(false);
    }
  }


  const initAudio = async () => {
    handleStop();
    try {
      await Audio.setAudioModeAsync({

        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      })

      loadAudio()
    } catch (e) {
      console.log(e)
    }
  }

  onPlaybackStatusUpdate = async (status) => {
    setIsBuffering(status.isBuffering);
    setDurationMillis(status.durationMillis);
    setPositionMillis(status.positionMillis);
  }

  const handleOnClose = () => {
    handleStop();
    closeModalAnimation();
    setTimeout(() => {
      setIsModalVisible(false);
    }, 300);
  }

  useEffect(() => {
    initAudio();
    openModalAnimation();
  }, [isModalVisible, record])


  useEffect(() => {
    dockModalAnimation();
  }, [docked])

  const handleDock = (state) => {
    setDocked(state);
  }

  const [modalY, setModalY] = useState(new Animated.Value(deviceHeight));

  const openModalAnimation = () => {
    Animated.timing(modalY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModalAnimation = () => {
    Animated.timing(modalY, {
      toValue: deviceHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const dockModalAnimation = () => {
    Animated.timing(modalY, {
      toValue: docked ? (deviceHeight - 140) : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      openModalAnimation();
    }, 600);
  }, [isModalVisible])

  return (

    isModalVisible && (

      <Animated.View style={[
        styles.modalContent,
        docked && styles.modalContentDocked,
        { transform: [{ translateY: modalY }] }
      ]}>
        <Loader isLoading={isLoading || isBuffering} />
        {docked ?
          <View style={styles.dockedView}>
            <Image
              style={[styles.albumCover_Docked]}
              source={{ uri: record.image }}
            />

            <View style={styles.trackInfo_Docked}>
              <Text style={[styles.trackInfoText, styles.largeText]}>
                {record.title}
              </Text>
            </View>

            <View style={styles.controls_Docked} >
              <Pressable style={styles.control} onPress={() => handlePlayPause()}>
                {isPlaying ? (
                  <MaterialIcons name="pause" size={35} color="#fff" />
                ) : (
                  <MaterialIcons name="play-arrow" size={35} color="#fff" style={styles.playIcon} />
                )}
              </Pressable>
              <Pressable style={styles.dockBtn} onPress={() => handleDock(false)}>
                <MaterialIcons name="keyboard-arrow-up" size={40} color="#fff" />
              </Pressable>
              {!isPlaying && <Pressable style={styles.close_Docked} onPress={handleOnClose}>
                <MaterialIcons name="close" size={25} color="#fff" />
              </Pressable>}
            </View>
          </View>
          :
          <View>
            <View style={styles.titleContainer}>
              <Pressable style={styles.dockBtn} onPress={() => handleDock(true)}>
                <MaterialIcons name="keyboard-arrow-down" size={40} color="#fff" />
              </Pressable>
              <Pressable onPress={handleOnClose}>
                <MaterialIcons name="close" size={25} color="#fff" />
              </Pressable>

            </View>
            <ScrollView style={styles.contentWrapper}>

              <View style={styles.gradientBG}>
                <LinearGradient
                  colors={['transparent', '#13161f']}
                  style={styles.gradient}
                />
                <View style={styles.imageWrapper}>
                  <Image
                    style={styles.image}
                    source={{ uri: record.image }}
                  />
                </View>
              </View>




              {playbackInstance &&
                <View>
                  <View style={styles.sliderWrapper}>
                    <View style={styles.sliderTiming}>
                      <Text style={styles.time}>{millisToMinutesAndSeconds(positionMillis)}</Text>
                      <Text style={styles.time}>{millisToMinutesAndSeconds(durationMillis)}</Text>
                    </View>
                    <Slider
                      inverted={true}
                      minimumValue={0}
                      maximumValue={durationMillis}
                      minimumTrackTintColor="#e12152"
                      maximumTrackTintColor="#444"
                      thumbTintColor="#e12152"
                      tapToSeek
                      value={positionMillis}
                      onSlidingComplete={onSlidingComplete}
                    />

                  </View>
                  <View style={styles.controls}>
                    <Pressable style={styles.control} onPress={() => handlePreviousTrack()}>
                      <MaterialIcons name="forward-10" size={35} color="#fff" />
                    </Pressable>
                    <Pressable style={styles.control} onPress={() => handlePlayPause()}>
                      {isPlaying ? (
                        <View style={styles.playIconWrapper}>
                          <MaterialIcons name="pause" size={35} color="#fff" />
                        </View>
                      ) : (
                        <View style={styles.playIconWrapper}>
                          <MaterialIcons name="play-arrow" size={35} color="#fff" style={styles.playIcon} />
                        </View>
                      )}
                    </Pressable>
                    <Pressable style={styles.control} onPress={() => handleNextTrack()}>
                      <MaterialIcons name="replay-10" size={35} color="#fff" />
                    </Pressable>
                  </View>
                  <View style={styles.trackInfo}>
                    <Text style={[styles.trackInfoText, styles.largeText]}>
                      {record.title}
                    </Text>
                    <Text style={[styles.trackInfoText, styles.smallText]}>
                      {record.author}
                    </Text>
                    <Text style={[styles.trackInfoText, styles.smallText]}>
                      {record.description}
                    </Text>
                  </View>
                </View>
              }
            </ScrollView>
          </View>
        }

      </Animated.View>
    )
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#13161f',
    position: 'absolute',
    zIndex: 99999,
    transform: [{ translateY: deviceHeight }]
  },
  modalContentDocked: {
    height: 60,
    overflow: 'hidden',
    backgroundColor: '#e91e63',
  },
  dockBtn: {
    paddingHorizontal: 15,
  },
  dockedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  albumCover_Docked: {
    width: 50,
    height: 50,
  },
  controls_Docked: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  trackInfo_Docked: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  contentWrapper: {
    position: 'relative',
    marginBottom: 90,
  },
  titleContainer: {
    height: Platform.OS === 'ios' ? 85 : 50,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    backgroundColor: '#13161f',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  sliderWrapper: {
    paddingHorizontal: 15,
  },
  sliderTiming: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  time: {
    color: '#fff',
    fontSize: 13,
  },

  gradientBG: {
    justifyContent: 'center',
    backgroundColor: '#e12152',
    height: 250,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  imageWrapper: {
    margin: 20,
    width: '80%',
    alignSelf: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  trackInfo: {
    paddingHorizontal: 20,
  },
  trackInfoText: {
    textAlign: 'left',
    color: '#fff',
  },
  largeText: {
    fontSize: 15,
    fontFamily: 'Cairo-Bold'
  },
  smallText: {
    fontFamily: 'Cairo-Regular',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 40,
    marginTop: 10,
  },
  playIconWrapper: {
    backgroundColor: '#e12152',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    textAlign: 'center',
    borderRadius: 50,
  },

  playIcon: {
    transform: [{ rotate: '180deg' }],
  }
});
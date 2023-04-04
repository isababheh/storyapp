//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions, Image, ScrollView, StatusBar, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Constants from 'expo-constants';
import CButton from './CButton';
import DetailsHeader from './DetailsHeader';
import { Loader } from './util';

import { PlayerContext } from '../context/Playercontext';

import { db, doc, updateDoc } from './firebaseConfig';

import { asyncStorageSet, asyncStorageGet } from './util';

import { DataContext } from '../context/Datacontext';


const { width, height } = Dimensions.get('window');

export default function Details(props) {
  const { getData } = useContext(DataContext);


  const params = props.route.params;
  const object = props.route.params.object;

  const [isLoading, setIsLoading] = useState(false);
  const [pageScroll, setPageScroll] = useState(0);
  const handleScroll = (event) => {
    setPageScroll(event.nativeEvent.contentOffset.y);
  }

  const { isModalVisible, setIsModalVisible } = useContext(PlayerContext);
  const { record, setRecord } = useContext(PlayerContext);
  const { docked, setDocked } = useContext(PlayerContext);

  //const [isModalVisible, setIsModalVisible] = useState(false);
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const playAudio = (object) => {
    setRecord(object);
    setDocked(false);
    setIsModalVisible(true);
    updatePlayed();
  }


  useEffect(() => {
    doLike('isInitialLoad');
    doSave('isInitialLoad');
  }, []);

  //////// SAVE /////////////
  const [isSaved, setIsSaved] = useState(false);
  const doSave = async (isInitialLoad) => {
    const savedVal = await asyncStorageGet('savedRecords');
    let found = false;
    let foundIndex;
    if (savedVal) {
      foundIndex = savedVal.indexOf(object.docref);
      if (foundIndex > -1) {
        found = true;
        setIsSaved(true);
      }
    }
    if (isInitialLoad) return;
    if (!savedVal) {
      await asyncStorageSet('savedRecords', [object.docref]);
      setIsSaved(true);
    } else if (found) {
      //if already saved remove from storage
      savedVal.splice(foundIndex, 1);
      await asyncStorageSet('savedRecords', savedVal);
      setIsSaved(false);
    } else {
      //if the save object exisit and this record is not saved
      savedVal.unshift(object.docref)
      await asyncStorageSet('savedRecords', savedVal);
      setIsSaved(true);
    }
  }

  // ////////////// LIKE /////////////////////
  const [isLiked, setIsLiked] = useState(false);
  const doLike = async (isInitialLoad) => {
    const savedVal = await asyncStorageGet('liked');
    let found = false;
    let foundIndex;
    if (savedVal) {
      foundIndex = savedVal.indexOf(object.docref);
      if (foundIndex > -1) {
        found = true;
        setIsLiked(true);
      }
    }
    if (isInitialLoad) return;
    let liked = object.liked ? parseInt(object.liked) : 0;

    const docRef = doc(db, "stories", object.docref);
    const data = {
      liked: found ? liked - 1 : liked + 1
    };

    setIsLoading(true);
    updateDoc(docRef, data).then(async docRef => {
      object.liked = found ? liked - 1 : liked + 1;

      //if the liked object is not exist, create the array
      if (!savedVal) {
        await asyncStorageSet('liked', [object.docref]);
        setIsLiked(true);
      } else if (found) {
        //if already liked remove from storage
        savedVal.splice(foundIndex, 1);
        await asyncStorageSet('liked', savedVal);
        setIsLiked(false);
      } else {
        //if the liked object exisit and this record is not liked
        savedVal.push(object.docref)
        await asyncStorageSet('liked', savedVal);
        setIsLiked(true);
      }
      setIsLoading(false);
      getData();
    });
  }

  ///////////// UPDATE PLAYED //////////////////
  const updatePlayed = () => {
    const docRef = doc(db, "stories", object.docref);
    let played = object.played ? parseInt(object.played) : 0;
    const data = {
      played: played + 1
    };
    updateDoc(docRef, data).then(async docRef => {
      getData();
      //save to history
      const savedVal = await asyncStorageGet('playedRecords');
      let found = false;
      let foundIndex;
      if (savedVal) {
        foundIndex = savedVal.indexOf(object.docref);
        if (foundIndex > -1) {
          found = true;
        }
      }
      //if the playedRecords object is not exist, create the array
      if (!savedVal) {
        await asyncStorageSet('playedRecords', [object.docref]);
      } else if (found) {
        //if already in playedRecords remove from storage, then add it at the start
        savedVal.splice(foundIndex, 1);
        savedVal.unshift(object.docref);
        await asyncStorageSet('playedRecords', savedVal);
      } else {
        //if the playedRecords object exisit and this record is not in playedRecords
        savedVal.unshift(object.docref)
        await asyncStorageSet('playedRecords', savedVal);
      }
    });
  }
  ////////////////////////////////////////////



  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <DetailsHeader navigation={props.navigation} pageScroll={pageScroll} title={object.title} />

      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.gradientBG}>
          <LinearGradient
            colors={['transparent', '#13161f']}
            style={styles.gradient}
          />
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{ uri: object.image }} />
          </View>
        </View>


        <View style={styles.contentWrapper}>
          <View style={styles.buttonsWrapper}>
            <CButton title="استمع الان" icon="play" bgcolor="#e12152" onPress={() => playAudio(object)} iconStyle={styles.playIcon}></CButton>

            {!isSaved && <CButton title="حفظ" icon="heart" size={18} onPress={() => doSave()}></CButton>}
            {isSaved && <CButton title="تم الحفظ" icon="heart" size={18} bgcolor="#fff" color={'#e12152'} onPress={() => doSave()}></CButton>}


            {!isLiked && <CButton icon={"thumbs-o-up"} size={20} onPress={() => doLike()}></CButton>}
            {isLiked && <CButton icon={"thumbs-up"} bgcolor={'#fff'} color={'#e12152'} size={20} onPress={() => doLike()}></CButton>}
          </View>

          <Text style={styles.title}>{object.title}</Text>

          <View style={styles.statsWrapper}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{object.played}</Text>
              <Text style={styles.statLabel}>استماع</Text>
            </View>
            <View style={styles.VSeperator}></View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{object.liked}</Text>
              <Text style={styles.statLabel}>اعجاب</Text>
            </View>
            <View style={styles.VSeperator}></View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{object.categoryMap.map((scat, i) => { return i > 0 ? (' - ' + scat.label) : scat.label })}</Text>
              <Text style={styles.statLabel}>التصنيف</Text>
            </View>
            <View style={styles.VSeperator}></View>
            <View style={styles.stat}>
              <Text style={styles.statVal}>30</Text>
              <Text style={styles.statLabel}>تعليق</Text>
            </View>
          </View>

          <View>
            <Text style={styles.description}>{object.description}</Text>
          </View>

        </View>
      </ScrollView>



      {/* {isModalVisible ?
        <CModal isVisible={isModalVisible} onClose={onModalClose}></CModal>
        : null} */}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: Platform.OS == 'ios' ? Constants.statusBarHeight : 0,
    flex: 1,
    backgroundColor: '#13161f',
    position: 'relative',
  },
  detailsHeader: {
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    padding: 10,
  },
  gradientBG: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e12152',
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
    height: height * .25,
    width: '80%',
    alignSelf: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  contentWrapper: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 15,
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Cairo-Bold'
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  stat: {
    alignItems: 'center',

  },
  statVal: {
    color: '#e12152',
    fontSize: 13,
    fontFamily: 'Cairo-Bold',
  },
  statLabel: {
    color: '#fff',
    fontFamily: 'Cairo-Regular',
    fontSize: 11,
  },
  VSeperator: {
    height: 25,
    marginTop: 8,
    backgroundColor: '#ccc',
    width: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: '#fff',
    textAlign: 'left',
    marginTop: 20,
    fontFamily: 'Cairo-Regular'
  },
  playIcon: {
    transform: [{ rotate: '180deg' }],
  }
});

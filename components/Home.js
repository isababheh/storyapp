//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions, Image, ScrollView, StatusBar, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Loader } from './util';


import CText from './CText';
import Header from './Header';
import SwiperWithChildren from './SwiperWithChildren';
import Block from './Block';
import BlockRounded from './BlockRounded';
import { useEffect, useState, useContext } from 'react';


const { width, height } = Dimensions.get('window');


import { DataContext } from '../context/Datacontext';

export default function Home({ navigation }) {
  const [pageScroll, setPageScroll] = useState(0);
  const handleScroll = (event) => {
    setPageScroll(event.nativeEvent.contentOffset.y);
  }


  // const { isLoading, setIsLoading } = useContext(DataContext);
  const { categories, setCategories } = useContext(DataContext);
  const { stories, setStories } = useContext(DataContext);
  const { swiperData, setSwiperData } = useContext(DataContext);

  return (
    <View style={styles.container}>

      <StatusBar
        animated={true}
        backgroundColor="#13161f"
        barStyle="light-content"
        showHideTransition="slide"
      />


      {/* <Loader isLoading={isLoading} /> */}
      {/* <Header pageScroll={pageScroll} /> */}
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.swiper}>
          <SwiperWithChildren navigation={navigation} swiperData={swiperData} />
        </View>

        <View>
          <CText cstyle={styles.margins} role={'title'}>{'اضيف حديثاً'}</CText>
          <ScrollView horizontal style={styles.block}>
            {stories.slice(0, 5).map((story, j) => {
              return (<View key={j} style={styles.blocks}>
                <BlockRounded navigation={navigation} story={story} />
              </View>)
            })}
          </ScrollView>
        </View>

        <View>
          {stories[0] && categories && categories.map((cat, i) => {
            let count = 0;
            return (<View key={i} style={styles.block}>

              {stories.map((story, j) => (

                (story.category.map((scat, k) => {
                  if (scat == cat.title && count < 1) {
                    count++;
                    return (<View key={k}>
                      <Block navigation={navigation} story={story} />
                      {j < stories.length - 1 && count < 1 && <View style={styles.HSeperator}></View>}
                    </View>);
                  }
                }))

              ))}
            </View>)
          })
          }
        </View>
      </ScrollView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    //paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    backgroundColor: '#13161f',
    position: 'relative'
  },
  swiper: {
    height: height * .45,
  },
  block: {
    backgroundColor: '#202123',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  blocks: {
    display: 'flex'
  },
  HSeperator: {
    height: 1,
    backgroundColor: '#13161f',
    marginTop: 10,
    marginBottom: 10
  },
  margins: {
    margin: 20
  }
});

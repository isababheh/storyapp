
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import { useLayoutEffect, useState, useCallback, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');
import { asyncStorageSet, asyncStorageGet } from './util';
import Block from './Block';
import Block2 from './Block2';
import { db, collection, getDocs, query, orderBy } from './firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import CText from './CText';
import { FontAwesome } from '@expo/vector-icons';
import { Loader } from './util';
import { DataContext } from '../context/Datacontext';

export default function Saved({ navigation }) {
    const { isLoading, setIsLoading } = useContext(DataContext);
    const { categories, setCategories } = useContext(DataContext);
    const { stories, setStories } = useContext(DataContext);

    const [savedStories, setSavedStories] = useState([]);
    const [filteredPlayed, setFilteredPlayed] = useState(null);

    const getAsyncStorageData = async () => {
        const savedRecords = await asyncStorageGet('savedRecords');
        const playedRecords = await asyncStorageGet('playedRecords');

        filterSavedAndPlayed(savedRecords, playedRecords);
    }

    async function filterSavedAndPlayed(savedRecords, playedRecords) {
        if (savedRecords) {
            let filterdList = [];
            savedRecords.forEach((record) => {
                stories.forEach((story) => {
                    if (record == story.docref) filterdList.push(story);
                })
            })
            setSavedStories(filterdList);
        }

        if (playedRecords && playedRecords.length) {
            let filterdPlayed = [];
            playedRecords.forEach((record) => {
                stories.forEach((story) => {
                    if (record == story.docref) filterdPlayed.push(story);
                })
            })
            setFilteredPlayed(filterdPlayed);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAsyncStorageData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Loader isLoading={isLoading} />
            {/* <Header pageScroll={pageScroll} /> */}
            <ScrollView scrollEventThrottle={16}>

                <View style={styles.gradientBG}>
                    <LinearGradient
                        colors={['transparent', '#13161f']}
                        style={styles.gradient}
                    />
                    <View style={styles.imageWrapper}>
                        <FontAwesome name="heart" size={60} color="#fff" />
                    </View>
                </View>


                {savedStories && savedStories.length ? <View>
                    <Text style={styles.titletxt}>تم حفظه</Text>
                    <View style={styles.block}>
                        {savedStories.map((story, k) => (
                            <View style={styles.wrapper} key={k}>
                                <Block navigation={navigation} story={story} />
                                {k < savedStories.length - 1 && <View style={styles.HSeperator}></View>}
                            </View>
                        ))}
                    </View>
                </View> :
                    <View style={styles.noResults}>
                        <FontAwesome name="battery-empty" size={70} color="#fff" />
                        <CText>لم تحفظ اي قصص بعد!</CText>
                    </View>}


                {filteredPlayed && filteredPlayed.length && <View>
                    <Text style={styles.titletxt}>تم الاستماع له</Text>
                    <ScrollView horizontal style={styles.block}>
                        {
                            filteredPlayed.map((played, i) => (
                                <View key={i}>
                                    <Block2 navigation={navigation} story={played} />
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>}

                <View>
                    <Text style={styles.titletxt}>اليك بعض ما قد يعجبك</Text>
                    <View style={styles.block}>
                        {
                            stories.map((story, k) => (
                                k < 5 ?
                                    <View key={k}>
                                        <Block navigation={navigation} story={story} />
                                        {k < stories.length - 1 && k < 4 && <View style={styles.HSeperator}></View>}
                                    </View> : null
                            ))
                        }</View>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        //marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#13161f',
        position: 'relative'
    },


    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titletxt: {
        color: '#fff',
        fontFamily: 'Cairo-Bold',
        fontSize: 16,
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 20,
    },
    noResults: {
        padding: 30,
        alignItems: 'center'
    },
    block: {
        backgroundColor: '#202123',
        padding: 15,
        marginBottom: 10,
    },
    HSeperator: {
        height: 1,
        backgroundColor: '#13161f',
        marginTop: 10,
        marginBottom: 10
    },
    gradientBG: {
        justifyContent: 'center',
        backgroundColor: '#e12152',
        height: 200,
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
        alignSelf: 'center',
        alignItems: 'center',
    },
});
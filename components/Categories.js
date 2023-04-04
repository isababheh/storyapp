
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import { useEffect, useContext, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Block2 from './Block2';
import { db, collection, getDocs, query, orderBy } from './firebaseConfig';
import { DataContext } from '../context/Datacontext';
import { Loader } from './util';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function Categories({ navigation }) {

    const { isLoading, setIsLoading } = useContext(DataContext);
    const { categories, setCategories } = useContext(DataContext);
    const { stories, setStories } = useContext(DataContext);
    
    // const { getData } = useContext(DataContext);

    // useEffect(() => {
    //     getData();
    // }, []);
    
    return (
        <View style={styles.container}>
            {/* <Header pageScroll={pageScroll} /> */}
            <Loader isLoading={isLoading} />
            <ScrollView scrollEventThrottle={16}>
                <View style={styles.gradientBG}>
                    <LinearGradient
                        colors={['transparent', '#13161f']}
                        style={styles.gradient}
                    />
                    <View style={styles.imageWrapper}>
                        <FontAwesome name="th-list" size={60} color="#fff" />
                    </View>
                </View>
                <View>
                    {categories && categories.map((cat, i) => {
                        return (<View key={i}>
                            <Text style={styles.titletxt}>{cat.label}</Text>
                            {/* <Text style={styles.desctxt}>{cat.description}</Text> */}

                            <ScrollView horizontal style={styles.block}>
                                {stories.map((story, j) => (


                                    (story.category.map((scat, k) => {
                                        if (scat == cat.title) {
                                            return (<View key={k} style={styles.blocks}>
                                                <Block2 navigation={navigation} story={story} />
                                            </View>);
                                        }
                                    }))

                                ))}
                            </ScrollView>
                        </View>)
                    })
                    }
                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
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
        paddingHorizontal: 20,
    },
    desctxt: {
        color: '#fff',
        fontFamily: 'Cairo-Regular',
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 5,
        paddingHorizontal: 20,
    },
    noResults: {
        padding: 30,
        alignItems: 'center'
    },
    block: {
        backgroundColor: '#202123',
        padding: 10,
        marginBottom: 10
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
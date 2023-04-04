import React from 'react';
import {
    Alert,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    View,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CButton from './CButton';


const { width, height } = Dimensions.get('window');

export default ({ navigation, swiperData }) => {
    const scrollRef = React.useRef(null);
    const goToLastIndex = () => {
        scrollRef.current.goToLastIndex();
    };
    const goToFirstIndex = () => {
        scrollRef.current.goToFirstIndex();
    };
    const goToSecondIndex = () => {
        scrollRef.current.scrollToIndex({ index: 1 });
    };
    const getCurrentIndex = () => {
        const currentIndex = scrollRef.current.getCurrentIndex();
        console.log(`the current index is ${currentIndex}`);
        Alert.alert(`the current index is ${currentIndex}`);
    };
    const getPrevIndex = () => {
        const prevIndex = scrollRef.current.getPrevIndex();
        console.log(`the previous index is ${prevIndex}`);
        Alert.alert(`the previous index is ${prevIndex}`);
    };
    const onChangeIndex = ({ index, prevIndex }) => {
        //console.log({ index, prevIndex });
    };
    return (
        <SwiperFlatList
            showPagination
            autoplay
            autoplayDelay={500}
            paginationActiveColor={'white'}
            paginationDefaultColor={'#e41c4a'}
            paginationStyle={styles.paganation}
            paginationStyleItem={styles.paganationDot}
            ref={scrollRef}
            onChangeIndex={onChangeIndex}>

            {swiperData.map((el, i) => (
                <View style={[styles.swiperChild]} key={i}>
                    <Image style={styles.swiperImage} source={{ uri: el.image }} />
                    <View style={styles.swiperShadowText}>
                        <Text style={styles.swiperText}>{el.title}</Text>
                        <View style={styles.swiperButtons}>
                            <CButton title="استمع الان" icon="play" bgcolor="#e12152" iconStyle={styles.playIcon} onPress={() => navigation.navigate("Details", { object: el })}></CButton>
                            <CButton title="تفاصيل" icon="info-circle" onPress={() => navigation.navigate("Details", { object: el })}></CButton>
                        </View>
                    </View>
                </View>
            ))}
        </SwiperFlatList>
    );
};

const styles = StyleSheet.create({
    swiperChild: {
        width,
        justifyContent: 'center',
        position: 'relative'
    },
    swiperShadowText: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        bottom: 0,
        left: 0,
        paddingBottom: 40,
        paddingTop: 10,
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    swiperImage: {
        width: '100%',
        height: '100%',
    },
    swiperText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Cairo-Bold'
    },
    swiperButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paganation: {
        bottom: -10
    },
    paganationDot: {
        borderRadius: 4,
        width: 10,
        height: 10
    },
    playIcon: {
        transform: [{ rotate: '180deg' }],
    }
});

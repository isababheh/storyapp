import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Image } from 'react-native';




export const categoryName = (categories, cat) => {
    return categories.filter(category => category.title == cat);
}

export const asyncStorageSet = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}
export const asyncStorageGet = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const Loader = ({ isLoading }) => {
    return (
        isLoading ? (<View style={styles.loader}>
            <View style={styles.loaderContent}>
                <Image source={require('../assets/images/loading-gif1.gif')} style={styles.loaderImage} />
               
            </View>
        </View>) : null
    )
}
const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(24,26,37,.4)',
        color: '#fff',
    },
    loaderContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(228,28,74,.7)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        lineHeight: 40,
        borderRadius: 5
    },
    loaderText: {
        fontFamily: 'Cairo-Bold',
        color: '#fff',
        fontSize: 12,
    },
    loaderImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginRight: 10
    }
});


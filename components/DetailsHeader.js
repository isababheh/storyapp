import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';

const DetailsHeader = (props) => {
  const { navigation, pageScroll, title } = props;
  const headerOpacity = pageScroll ? pageScroll / 200 + .3 : 0;
  const headerCls = { backgroundColor: `rgba(24,26,37,${headerOpacity})` }//#181a26}
  return (
    <View style={[styles.container, headerCls]}>
      <Pressable onPress={() => { navigation.goBack(null) }}>
        <FontAwesome5 name="arrow-right" size={25} color={'#fff'} />
      </Pressable>
      <Text numberOfLines={1} style={styles.headerText}>{title}</Text>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    height: 50,
    color: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    marginLeft: 20
  }
});

export default DetailsHeader;
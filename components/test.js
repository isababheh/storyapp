import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

const Header = (props) => {
  const { pageScroll } = props;
  const headerOpacity = pageScroll / 200 + .3;
  const headerCls = { backgroundColor: `rgba(24,26,37,${headerOpacity})` }//#181a26}
  return (
    <View style={[styles.container, headerCls]}>
      <View style={styles.logoBack}>
        <AntDesign name="play" size={20} color="#e12152" />
      </View>
      <Text style={styles.appName}>قصة</Text>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    top: 0,
    height: 50,
    color: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  logoBack: {
    width: 30,
    padding: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 3,
  },
  appName: {
    color: '#fff',
    marginRight: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Header;
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import CText from "./CText";

const BlockRounded = ({ navigation, story }) => {
  //const { children, style, story } = props;
  return (
    story && <Pressable onPress={() => navigation.navigate("Details", { object: story })} style={styles.blockContent}>
      <View style={styles.blockWrapper}>
        <Image style={styles.blockImage} source={{ uri: story.image }} />
        <View style={styles.blockText}>
          <CText numberOfLines={1} role='heading' size={14}>{story.title}</CText>
          <CText numberOfLines={2}>{story.description}</CText>
          <View style={styles.statsWrapper}>
            <View style={styles.stat}>
              <CText numberOfLines={1} color='#fff' size={10}>{story.categoryMap.map((scat, i) => { return i > 0 ? (' - ' + scat.label) : scat.label })}</CText>
            </View>
           
          </View>
        </View>
      </View>
    </Pressable>
  )
};


const styles = StyleSheet.create({
  blockContent: {
    flex: 1,
    width: 200,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#13161f',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10
  },
  blockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 100
  },
  blockText: {
    flex: 1,
    width: '100%',
    textAlign: 'center'
  },
  statsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e12152',
    padding: 2, paddingHorizontal: 5,
    borderRadius: 5,
  },
  stattxt: {
    marginLeft: 8,
    color: '#fff'
  }
});

export default BlockRounded;
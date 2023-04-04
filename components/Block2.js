import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import CText from "./CText";

const Block2 = ({ navigation, story }) => {
  //const { children, style, story } = props;
  return (
    story && <Pressable onPress={() => navigation.navigate("Details", { object: story })} style={styles.blockContent}>
      <View>
        <Image style={styles.blockImage} source={{ uri: story.image }} />
        <View style={styles.blockText}>
          <CText numberOfLines={1} cstyle='heading'>{story.title}</CText>
          <CText numberOfLines={2}>{story.description}</CText>
          <View style={styles.statsWrapper}>
            {story.categoryMap && <View style={styles.stat}>
              <CText numberOfLines={1} color='#fff' size={10}>{story.categoryMap.map((scat, i) => { return i > 0 ? (' - ' + scat.label) : scat.label })}</CText>
            </View>}
            {story.played ? <View style={styles.stat}>
              <FontAwesome5 name="volume-down" size={15} color="#fff" />
              <Text style={styles.stattxt}>{story.played}</Text>
            </View> : null}

            {story.liked ?
              <View style={styles.stat}>
                <FontAwesome5 name="thumbs-up" size={15} color="#fff" />
                <Text style={styles.stattxt}>{story.liked}</Text>
              </View>
              : null}
          </View>
        </View>
      </View>
    </Pressable>
  )
};


const styles = StyleSheet.create({
  blockContent: {
    flex: 1,
    width: 300,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: '#13161f',
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  blockImage: {
    width: '100%',
    height: 180,
    flex: .5,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  blockText: {
    flex: 1,
    width: '100%'
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

export default Block2;
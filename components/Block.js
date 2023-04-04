import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { categoryName } from './util';


import CText from "./CText";

const Block = ({ navigation, story }) => {
  //const { children, style, story } = props;
  return (
    story && <Pressable onPress={() => navigation.navigate("Details", { object: story })}>
      <View style={styles.blockContent}>
        <Image style={styles.blockImage} source={{ uri: story.image }} />
        <View style={styles.blockText}>
          <CText numberOfLines={1} role='heading'>{story.title}</CText>
          <CText numberOfLines={2}>{story.description}</CText>
          <View style={styles.statsWrapper}>
            <View style={styles.stat}>
              {story.categoryMap && <CText numberOfLines={1} color='#fff' size={10}>{story.categoryMap.map((scat, i) => { return i > 0 ? (' - ' + scat.label) : scat.label })}</CText>}
            </View>
            {story.played ? <View style={styles.stat}>
              <FontAwesome5 name="volume-down" size={15} color="#fff" />
              <Text style={styles.stattxt}>{story.played}</Text>
            </View> : null}
            {story.liked ? <View style={styles.stat}>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  blockImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  blockText: {
    flex: 1,
    marginLeft: 20,
  },
  statsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e12152',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  stattxt: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 10,
  }
});

export default Block;
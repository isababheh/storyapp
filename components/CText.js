import { Text, StyleSheet } from "react-native";

const CText = (props) => {
  const { children,color, role, size, cstyle, numberOfLines } = props;
  return (
    <Text style={[styles.text, styles[role], cstyle && cstyle, size && { fontSize: size }, color && {color: color}]} numberOfLines={numberOfLines}>{children}</Text>
  )
};


const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Cairo-Regular'
  },
  title: {
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  }
});

export default CText;
import { Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


const CButton = (props) => {
  const { children, cstyle, iconStyle, title, icon, bgcolor, color = "#fff", size = 14, onPress } = props;
  const extraCls = bgcolor ? { 'backgroundColor': bgcolor } : { 'borderColor': '#fff', 'borderWidth': 1 }
  return (
    <Pressable style={[styles.button, extraCls]} onPress={onPress}>
      {title && <Text style={[styles.buttonText, { color: color }]}>{title}</Text>}
      {icon && <FontAwesome name={icon} size={size} color={color} style={iconStyle ? iconStyle : null} />}
    </Pressable>
  )
};


const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    marginRight: 10,
    fontFamily: 'Cairo-Bold'
  }
});

export default CButton;
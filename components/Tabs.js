import { Platform, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons';



import Home from './Home';
import Details from './Details';
import Saved from './Saved'
import Categories from './Categories'


const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
    }}>
      <HomeStack.Screen name="Home" component={Home} options={{
        headerShown: false,
      }} />
      <HomeStack.Screen name="Details" component={Details} options={{
        headerShown: false,
      }} />
    </HomeStack.Navigator>
  );
}


const SavedStack = createNativeStackNavigator();
function SavedStackScreen() {
  return (
    <SavedStack.Navigator screenOptions={{
    }}>
      <SavedStack.Screen name="Saved" component={Saved} options={{
        headerShown: false,
      }} />
      <SavedStack.Screen name="Details" component={Details} options={{
        headerShown: false,
      }} />
    </SavedStack.Navigator>
  );
}


const CategoriesStack = createNativeStackNavigator();
function CategoriesStackScreen() {
  return (
    <CategoriesStack.Navigator screenOptions={{
    }}>
      <CategoriesStack.Screen name="Saved" component={Categories} options={{
        headerShown: false,
      }} />
      <CategoriesStack.Screen name="Details" component={Details} options={{
        headerShown: false,
      }} />
    </CategoriesStack.Navigator>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarStyle: {
          position: 'relative',
          backgroundColor: '#181a26',
          bottom: 0,
          height: 80,
          paddingBottom: 20
        }
      }}
    >
      <Tab.Screen name="الرئيسية" component={HomeStackScreen} options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="home" size={20} color={focused ? '#e91e63' : '#fff'} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.tabBarLabel, { color: focused ? '#e91e63' : '#fff' }]}>الرئيسية</Text>
        )
      }} />
      <Tab.Screen name="تصنيفات" component={CategoriesStackScreen} options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="th-list" size={18} color={focused ? '#e91e63' : '#fff'} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.tabBarLabel, { color: focused ? '#e91e63' : '#fff' }]}>تصنيفات</Text>
        )
      }} />
      <Tab.Screen name="مفضل" component={SavedStackScreen} options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="heart" size={18} color={focused ? '#e91e63' : '#fff'} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.tabBarLabel, { color: focused ? '#e91e63' : '#fff' }]}>مفضل</Text>
        )
      }} />
    </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Cairo-Bold',
  },
});

export default Tabs;
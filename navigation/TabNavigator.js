import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';
import { Component } from 'react';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
          light_theme: true,
          isUpdated: false
        };
      }
    
      renderFeed = props => {
        return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
      };
    
      renderStory = props => {
        return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
      };
    
      changeUpdated = () => {
        this.setState({ isUpdated: true });
      };
    
      removeUpdated = () => {
        this.setState({ isUpdated: false });
      };
    
      componentDidMount() {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function(snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({ light_theme: theme === "light" ? true : false });
      }

    render(){
    return(
        <Tab.Navigator
        labeled={false}
        barStyle={StyleSheet.bottomTabStyles}
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if(route.name === 'Feed' ) {
                        iconName = focused
                        ? 'book'
                        : 'book-outline';
                    }else if(route.name === 'CreatePost') {
                        iconName = focused ? 'create' : 'create-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                ActiveTintColor: '#ee8249',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Feed" component={Feed}  />
            <Tab.Screen name="CreatePost" component={CreatePost}/>
        </Tab.Navigator>
    );
}
}

const styles = StyleSheet.create({
    bottomTabStyle: {
      backgroundColor: "#2f345d",
      height: "8%",
      borderTopLeftRadius: RFValue(30),
      borderTopRightRadius: RFValue(30),
      overflow: "hidden",
      position: "absolute"
    },
}),

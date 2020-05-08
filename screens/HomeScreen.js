import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import {Avatar, ListItem} from "react-native-elements";
import UserContext from "../connection/userContext"
import {victimHistory} from "../connection/comms";


export default function HomeScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    victimHistory()
        .then(res => setData(res))
        .finally(() => {
          console.log(data[0])
          setLoading(false)
        })
  }, []);


  return (
      <UserContext.Consumer>
        {({loggedIn, setLoggedin}) => (
            <View style={styles.container}>
              <View style={{alignItems: "center", height: 200, justifyContent: "center"}}>
                <Image source={require("../assets/images/SLC.png")} resizeMode='cover'/>
              </View>
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {isLoading ? <ActivityIndicator/> : (
                    data.map((d, i) => (
                        <ListItem
                            leftElement={() => {
                              return (
                                  <Avatar source={{uri: 'data:image/jpeg;base64,' + d.Path}} rounded size={"large"}/>
                              )
                            }}
                            title={d.Address}
                            subtitle={
                              <View>
                                <Text>Volunteer: { d.VolunteerName}</Text>
                                <Text>Date: {d.Date}</Text>
                                <Text>Time: {d.Time}</Text>
                              </View>
                            }
                            rightElement={
                              <View>
                                <Text>Status:</Text>
                                <Text>{d.VictimType}</Text>
                              </View>
                            }
                            key={i}
                            titleStyle={{fontSize: 16, fontWeight: "bold"}}
                            chevron={true}
                            pad={25}
                            bottomDivider
                            onPress={() => {
                              // navigation.navigate("Profile")
                            }}
                        />
                    ))
                )}
              </ScrollView>
            </View>
        )}
      </UserContext.Consumer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

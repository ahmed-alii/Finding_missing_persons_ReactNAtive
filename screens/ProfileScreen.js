import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, ListItem} from "react-native-elements";
import UserContext from "../connection/userContext";
import {updateProfile} from "../connection/comms";
import {deleteUserData} from "../connection/AsyncStorage";


export default class ProfileScreen extends Component {
    render() {
        return (
            <UserContext.Consumer>
                {({loggedIn, setLoggedin}) => (
                    console.log("PROFILE -> ", loggedIn),
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                              style={styles.container}>
                            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                                <View style={{alignItems: "center", marginBottom: 20}}>
                                    <Avatar source={require("../assets/images/robot-prod.png")} size={"xlarge"}
                                            rounded/>
                                </View>

                                <ListItem
                                    topDivider
                                    title="Full Name"
                                    input={{
                                        placeholder: 'Type Here',
                                        defaultValue: loggedIn.name,
                                        onChangeText: text => {
                                            setLoggedin(prev => ({...prev, name: text}))
                                        }
                                    }}
                                />
                                <ListItem
                                    topDivider
                                    title="Email"
                                    input={{
                                        placeholder: 'Type Here',
                                        defaultValue: loggedIn.email,
                                        textContentType: "emailAddress",
                                        onChangeText: text => {
                                            setLoggedin(prev => ({...prev, email: text}))
                                        }
                                    }}
                                />
                                <ListItem
                                    topDivider
                                    title="Location"
                                    input={{
                                        placeholder: 'Type Here',
                                        defaultValue: loggedIn.city,
                                        onChangeText: text => {
                                            setLoggedin(prev => ({...prev, city: text}))
                                        }
                                    }}
                                />
                                <ListItem
                                    topDivider
                                    title="Phone"
                                    input={{
                                        placeholder: 'Type Here',
                                        defaultValue: loggedIn.mobile,
                                        textContentType: "telephoneNumber",
                                        onChangeText: text => {
                                            setLoggedin(prev => ({...prev, mobile: text}))
                                        }
                                    }}
                                />
                                <ListItem
                                    topDivider
                                    title="Password"
                                    input={{
                                        placeholder: 'Type Here',
                                        textContentType: "password",
                                        defaultValue: loggedIn.password,
                                        secureTextEntry: true,
                                        onChangeText: text => {
                                            setLoggedin(prev => ({...prev, password: text}))
                                        }
                                    }}
                                />

                                <Button
                                    onPress={() => {
                                        if (loggedIn.password) {
                                            if (loggedIn.password.length < 6) {
                                                alert("Minimum password length is 6 characters.")
                                            } else {
                                                updateProfile(loggedIn).then(r => {
                                                    if (r.flag === "true") {
                                                        alert(r.msg);
                                                        deleteUserData().then(() => {
                                                            setLoggedin(false)
                                                        })
                                                    } else {
                                                        alert(r.msg)
                                                    }
                                                })
                                            }
                                        } else {
                                            alert("No password provided.")
                                        }
                                    }}
                                    title={"Update Profile"}
                                    style={{padding: 10, marginTop: 20}}
                                />
                                <Button
                                    onPress={() => {
                                        deleteUserData().then(() => {
                                            setLoggedin(false)
                                        })
                                    }}
                                    title={"Sign Out"}
                                    style={{padding: 10, marginTop: 20}}
                                />

                            </ScrollView>
                        </KeyboardAvoidingView>

                )}
            </UserContext.Consumer>
        );
    }
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

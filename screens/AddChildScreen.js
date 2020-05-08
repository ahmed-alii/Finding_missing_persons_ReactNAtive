import React, {useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Avatar, Button} from "react-native-elements";
import {addVictim, saveRequest} from "../connection/comms";
import UserContext from "../connection/userContext";
import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment';

export default function AddChildScreen() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    let time = moment().format('hh:mm a');


    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    getPermissionAsync().then();

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true
            });
            if (!result.cancelled) {
                setImage(result.base64);
            }
        } catch (E) {
            console.log(E);
        }
    };

    const saveImage = (userData) => {
        console.log("saveImage-> ", userData)

        saveRequest({
            image: image,
            volunteerId: userData.id,
            date: Date.now(),
            type: "LOST",
            time: time,
            lattitude: 212323,
            address: "LAHORE"
        }).then(r => {
            if (r.flag === false) {
                Alert.alert(
                    "Oh uh!",
                    r.msg,
                    [{
                        text: "Ok",
                        onPress: () => setLoading(false)
                    }]
                )
            } else {
                Alert.alert(
                    "News!",
                    r.msg,
                    [{
                        text: "Ok",
                        onPress: () => setLoading(false)
                    }]
                )
                console.log(r.code)
                console.log(r.res)
            }

        }).catch(function (error) {
            alert(error);
        });
    }

    const addImage = (userData) => {

        addVictim({
            image: image,
            volunteerId: userData.id,
            date: Date.now(),
            type: "LOST",
            time: time,
            lattitude: 212323,
            address: "LAHORE"
        }).then(r => {
            if (r.flag === false) {
                Alert.alert(
                    "Oh uh!",
                    r.msg,
                    [{
                        text: "Ok",
                        onPress: () => setLoading(false)
                    }]
                )
            } else {
                Alert.alert(
                    "News!",
                    r.msg,
                    [{
                        text: "Ok",
                        onPress: () => setLoading(false)
                    }]
                )
                console.log(r.code)
                console.log(r.res)
            }

        }).catch(function (error) {
            alert(error);
        });
    }

    return (
        <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <View style={styles.container}>
                    <View style={{alignItems: "center", height: 200, justifyContent: "center"}}>
                        <Image source={require("../assets/images/SLC.png")} resizeMode='cover'/>
                    </View>
                    <Spinner
                        visible={loading}
                        textContent={'Searching Database. Please wait.'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <ScrollView style={styles.container}
                                contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color: "grey"}}>Search for a missing person by uploading the image.</Text>
                        <Button title=" Pick Image " onPress={pickImage}
                                containerStyle={{marginVertical: 20}}
                                titleStyle={{color: "orange", fontWeight: "bold"}}
                                raised
                                type={"outline"}/>

                        {image &&
                        <Avatar source={{uri: 'data:image/jpeg;base64,' + image}} rounded size={"xlarge"}/>}

                        {image && <Button title=" Save Request " onPress={() => {
                            saveImage(loggedIn)
                            setLoading(true)
                        }} containerStyle={{width: "70%", paddingVertical: 5, marginTop: 20}}/>}


                        {image && <Button title=" Add to lost persons " onPress={() => {
                            setLoading(true)
                            addImage(loggedIn)
                        }} containerStyle={{width: "70%", paddingVertical: 5}} type={"solid"}/>}
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
    spinnerTextStyle: {
        color: '#FFF'
    }
});

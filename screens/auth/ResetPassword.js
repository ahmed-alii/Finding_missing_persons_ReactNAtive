import React, { Component } from "react";
import {StyleSheet, Text, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>
                    Forget Password SCREEN
                </Text>
                <Button title={"Login"} onPress={() =>this.props.navigation.navigate("Login")}/>
                <Button title={"Register"} onPress={() =>this.props.navigation.navigate("Register")}/>
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});

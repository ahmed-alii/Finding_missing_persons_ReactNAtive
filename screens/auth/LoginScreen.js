import React, {useState, useContext} from "react";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import {Formik} from "formik";
import * as Yup from "yup";
// import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import {login} from "../../connection/comms";
import UserContext from "../../connection/userContext"
import {saveData} from "../../connection/AsyncStorage";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .label("Email")
        .email("Enter a valid email")
        .required("Please enter a registered email"),
    password: Yup.string()
        .label("Password")
        .required()
        .min(6, "Password must have at least 6 characters ")
});

function Login({navigation, firebase}) {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState("ios-eye");
    const { loggedIn, setLoggedin } = useContext(UserContext);

    function goToSignup() {
        return navigation.navigate("Register");
    }

    function goToForgotPassword() {
        return navigation.navigate("Reset");
    }

    function handlePasswordVisibility() {
        if (rightIcon === "ios-eye") {
            setRightIcon("ios-eye-off");
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === "ios-eye-off") {
            setRightIcon("ios-eye");
            setPasswordVisibility(!passwordVisibility);
        }
    }


    async function handleOnLogin(values, actions) {
        await login(values).then(r => {
            if (r.flag === "true") {
                console.log("loggin.js, (r.res) ->", r.res)

                saveData(r.res).then()
                setLoggedin(r.res)

                actions.setSubmitting(false);


            } else if (r.flag === "false") {
                alert(r.msg)
                actions.setSubmitting(false);

            } else {
                actions.setSubmitting(false);
                alert("Failed to communicate with the server.")
            }
        })

    }

    return (
            <SafeAreaView style={styles.container}>
                <View style={{alignItems: "center", height: 200, justifyContent: "center"}}>
                    <Image source={require("../../assets/images/SLC.png")} resizeMode='cover'/>
                </View>
                <Formik
                    initialValues={{email: "", password: ""}}
                    onSubmit={(values, actions) => {
                        handleOnLogin(values, actions);
                    }}
                    validationSchema={validationSchema}
                >
                    {({
                          handleChange,
                          values,
                          handleSubmit,
                          errors,
                          isValid,
                          touched,
                          handleBlur,
                          isSubmitting
                      }) => (
                        <>
                            <FormInput
                                name="email"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                placeholder="Enter email"
                                autoCapitalize="none"
                                iconName="ios-mail"
                                iconColor="#2C384A"
                                onBlur={handleBlur("email")}
                            />
                            <ErrorMessage errorValue={touched.email && errors.email}/>
                            <FormInput
                                name="password"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                placeholder="Enter password"
                                secureTextEntry={passwordVisibility}
                                iconName="ios-lock"
                                iconColor="#2C384A"
                                onBlur={handleBlur("password")}
                                rightIcon={
                                    <TouchableOpacity onPress={handlePasswordVisibility}>
                                        <Ionicons name={rightIcon} size={28} color="grey"/>
                                    </TouchableOpacity>
                                }
                            />
                            <ErrorMessage errorValue={touched.password && errors.password}/>
                            <View style={styles.buttonContainer}>
                                <FormButton
                                    buttonType="outline"
                                    onPress={handleSubmit}
                                    title="LOGIN"
                                    buttonColor="#039BE5"
                                    disabled={!isValid || isSubmitting}
                                    loading={isSubmitting}
                                />
                            </View>
                            <ErrorMessage errorValue={errors.general}/>
                        </>
                    )}
                </Formik>
                <Button
                    title="Don't have an account? Sign Up"
                    onPress={goToSignup}
                    titleStyle={{
                        color: "#F57C00"
                    }}
                    type="clear"
                />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    logoContainer: {
        marginBottom: 15,
        alignItems: "center"
    },
    buttonContainer: {
        margin: 25
    }
});

export default Login;

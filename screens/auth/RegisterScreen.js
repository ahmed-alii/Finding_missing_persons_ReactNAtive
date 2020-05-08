import React, {useContext, useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import {Formik} from "formik";
import * as Yup from "yup";
// import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import {register} from "../../connection/comms";
import UserContext from "../../connection/userContext"

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .label("Full Name")
        .required("Please enter your full name"),
    city: Yup.string()
        .label("City")
        .required("Please enter your city name"),
    mobile: Yup.string()
        .label("Mobile Number")
        .required("Please enter your contact number"),
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
    const {loggedIn, setLoggedin} = useContext(UserContext);

    function goToLogin() {
        return navigation.navigate("Login");
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


    async function onRegister(values, actions) {
        await register(values).then(r => {
            if (r.flag === "true") {
                alert(r.msg);
                navigation.navigate("Login")
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
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                  style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Formik
                        initialValues={{email: "", password: "", mobile: "", city: "", name: ""}}
                        onSubmit={(values, actions) => {
                            onRegister(values, actions);
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
                                    name="name"
                                    value={values.name}
                                    onChangeText={handleChange("name")}
                                    placeholder="Enter your name"
                                    autoCapitalize="none"
                                    iconName="ios-person"
                                    iconColor="#2C384A"
                                    onBlur={handleBlur("name")}
                                />
                                <ErrorMessage errorValue={touched.name && errors.name}/>
                                <FormInput
                                    name="city"
                                    value={values.city}
                                    onChangeText={handleChange("city")}
                                    placeholder="Enter city"
                                    autoCapitalize="none"
                                    iconName="ios-compass"
                                    iconColor="#2C384A"
                                    onBlur={handleBlur("city")}
                                />
                                <ErrorMessage errorValue={touched.city && errors.city}/>
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
                                    name="mobile"
                                    value={values.mobile}
                                    onChangeText={handleChange("mobile")}
                                    placeholder="Enter mobile"
                                    autoCapitalize="none"
                                    iconName="ios-call"
                                    iconColor="#2C384A"
                                    onBlur={handleBlur("mobile")}
                                />
                                <ErrorMessage errorValue={touched.mobile && errors.mobile}/>
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
                                        title="REGISTER"
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
                        title="Already registered? Login"
                        onPress={goToLogin}
                        titleStyle={{
                            color: "#F57C00"
                        }}
                        type="clear"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    logoContainer: {
        marginBottom: 15,
        alignItems: "center"
    },
    contentContainer: {
        paddingTop: 30,
    },
    buttonContainer: {
        margin: 25
    }
});

export default Login;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import LandingGraphic from "./LandingGraphic.png";
import { login, register } from "./functions";
import { LinearGradient } from "expo-linear-gradient";
import LandingBG from "./LandingBG.png";
import Logo from "./logo.png";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

const Login = ({ navigation }) => {
  const [authState, setAuthState] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { width, height } = Dimensions.get("window");
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  const handleLogin = async () => {
    setErrorMsg("");
    await login(email, password, setErrorMsg, navigation);
    if (errorMsg === "success login") {
      navigation.push("Home");
    }
  };

  const handleRegister = async () => {
    setErrorMsg("");
    await register(email, password, setErrorMsg, navigation);
    if (errorMsg === "success register") {
      navigation.push("Home");
    }
  };

  return (
    <ImageBackground
      source={LandingBG}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: "Urbanist",
              textAlign: "left",
              fontSize: 20,
              marginTop: height * 0.12,
              color: "#fff",
              fontFamily: "Montserrat_500Medium",
            }}
          >
            FRIENDLY
          </Text>
          <Text
            style={{
              fontFamily: "Urbanist",
              textAlign: "left",
              fontSize: 20,
              marginTop: height * 0.02,
              color: "#fff",
              fontFamily: "Montserrat_500Medium",
            }}
          >
            NEIGHBORHOOD
          </Text>
          <Image
            source={Logo}
            style={{
              height: height * 0.15,
              width: width * 0.325,
              marginTop: height * 0.03,
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Urbanist",
                textAlign: "left",
                fontSize: 25,
                marginTop: height * 0.1,
                color: "#fff",
                fontFamily: "Montserrat_500Medium",
              }}
            >
              SIGN IN
            </Text>
          </View>
          <View
            style={{
              marginTop: height * 0.04,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Email..."
              value={email}
              onChangeText={setEmail}
              keyboardType="email"
              placeholderTextColor="#fff"
            />
            <TextInput
              style={styles.input2}
              placeholder="Password..."
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#fff"
              secureTextEntry
            />
          </View>
          {/* {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null} */}
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                zIndex: 2,
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: width * 0.1,
                paddingVertical: height * 0.02,
                marginTop: height * 0.03,
              }}
              onPress={authState === "login" ? handleLogin : handleRegister}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 400,
                  textAlign: "right",
                  zIndex: 3,
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                {authState === "login" ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={
                authState === "login"
                  ? () => setAuthState("register")
                  : () => setAuthState("login")
              }
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 30,
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                {authState === "login" ? "REGISTER" : "LOGIN"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "65%",
    borderColor: "white",
    fontFamily: "Montserrat_400Regular",
    borderWidth: 1,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    color: "white",
  },
  input2: {
    width: "65%",
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    color: "white",
    fontFamily: "Montserrat_400Regular",
  },
  landingText: {
    fontSize: 20,
    textAlign: "left",
    fontFamily: "Urbanist",
    color: "black",
  },
  landingGraphic: {
    height: "40%",
    width: "60%",
  },
  landingSubtext: {
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  loginButton: {
    fontSize: 20,
    color: "#007bff",
  },
  errorMsg: {
    color: "red",
  },
});

export default Login;

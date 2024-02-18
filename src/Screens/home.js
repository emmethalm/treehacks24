import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Button,
} from "react-native";
import Emmet from "./emmet.jpeg";
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
import { useState } from "react";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: height * 0.1,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Montserrat_400Regular",
            marginLeft: width * 0.1,
          }}
        >
          Hey there,
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Montserrat_500Medium",
            fontWeight: "bold",
          }}
        >
          {"  "}
          Emmet 👋
        </Text>
      </View>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text style={styles.landingText}>Home</Text>
      <TouchableOpacity onPress={() => navigation.push("Chat")}>
        <Text style={styles.landingSubtext}>Go to Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("Recording")}>
        <Text style={styles.landingSubtext}>Go to Recording</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181922",
  },
  landingText: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
  },
  landingSubtext: {
    fontSize: 15,
    textAlign: "center",
    fontVariant: "underline",
  },
});

export default Home;

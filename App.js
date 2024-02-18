import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/home";
import Login from "./src/Screens/login";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import ChatScreen from "./src/Screens/chat";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import "@fontsource/urbanist";
import VoiceRecordingScreen from "./src/Screens/recording";

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ConvexProvider client={convex}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Recording" component={VoiceRecordingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ConvexProvider>
    </NavigationContainer>
  );
}

export default App;

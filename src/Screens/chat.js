import React, { useState, useCallback, useContext, useEffect } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const ChatPage = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const pushMessage = useMutation(api.chat.addItem);

  //   const fetchMessages = useCallback(async () => {
  //     console.log("Fetching the data");
  //     const courseId = courseState.activeCourse._id;
  //     const conversations = await ConversationsApi.GetConversations();
  //     for (let index in conversations) {
  //       const conversation = conversations[index];
  //       if (conversation.courseId === courseId) {
  //         const uniqueMessages = conversation.messages
  //           .map((message, index) => {
  //             return {
  //               _id: message._id,
  //               text: message.message,
  //               createdAt: new Date(message.timestamp),
  //               user: {
  //                 _id: message.sender === "student" ? 1 : 2,
  //               },
  //             };
  //           })
  //           .reverse();
  //         setMessages(uniqueMessages);
  //       }
  //     }
  //   }, [courseState.activeCourse._id]);

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener("focus", () => {
  //       fetchMessages();
  //     });

  //     return unsubscribe;
  //   }, [navigation, fetchMessages]);
  const handleSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setTimeout(() => {
      const autoReply = newMessages.map((msg) => ({
        _id: Math.round(Math.random() * 1000000),
        text: "This is an automated response.",
        createdAt: new Date(new Date(msg.createdAt).getTime() + 1000),
        user: {
          _id: 2,
          name: "Bot",
        },
      }));

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, autoReply)
      );
    }, 100);

    newMessages.forEach(async (message) => {
      pushMessage({
        message: message.text,
        id: message._id,
      });
    });
  }, []);

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#434343",
          borderRadius: 22,
          marginLeft: 15,
          marginRight: 15,
          bottom: 0,
          borderWidth: 0,
          borderTopColor: "#434343",
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialIcons
            style={{
              paddingTop: 10,
              zIndex: 2,
              //borderWidth: 1,
              height: "100%",
            }}
            name="send"
            size={20}
            color="white"
          />
        </View>
      </Send>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      {/* <ChatHeader
        onPressFunction={() => navigation.navigate("ChatLanding")}
        // profilePicture={thumbnailPfp}
        receiverName={"Dave Kline"}
      /> */}
      <GiftedChat
        // renderAvatar={(props) => {
        //   if (props.user._id === 2) {
        //     return null;
        //   }
        // }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "#f9f9f9",
                },
                left: {
                  color: "#fff",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#575757",
                  marginBottom: 10,
                },
                right: {
                  backgroundColor: "#6462E5",
                  marinBottom: 10,
                },
              }}
            />
          );
        }}
        renderSend={renderSend}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        placeholder={"Type a message"}
        textInputStyle={{
          backgroundColor: "transparent",
          color: "#fff",
          padding: 10,
        }}
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1, name: "User" }}
        isTyping={true}
      />
    </View>
  );
};

export default ChatPage;

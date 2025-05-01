import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, NativeModules } from 'react-native';
import { io } from 'socket.io-client';
import UserList from './components/UserList';
import { API_URL } from '../../services/url';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const socket = io(API_URL.HOST); 
const start = { x: 0, y: 0 }
const end = { x: 1, y: 0 }


export default function ChatScreen({ user }: any) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any>([]);
  const [typingUser, setTypingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState({});
  const username = user?.name;
  const flatListRef = useRef<FlatList>(null);

  const gradient = useSelector((state: any) => state.theme.gradient);
  const font = useSelector((state: any) => state.theme.font);

  const navigation = useNavigation();

  useEffect(() => {
    socket.emit('join', username);

    socket.on('receive_message', (data) => {
      setChat((prev: any) => [...prev, data]);
    });

    socket.on('user_list', setUsers);
    socket.on('user_typing', setTypingUser);
    socket.on('status_update', ({ user, status }) => {
      setOnlineStatus((prev) => ({ ...prev, [user]: status === 'online' }));
    });

    // Cleanup on unmount
    return () => {
      socket.off('leave', username);
      socket.off('receive_message');
      socket.off('user_list');
      socket.off('user_typing');
      socket.off('status_update');

    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when chat updates
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chat]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message, sender: username });
      setMessage('');
      socket.emit('stop_typing');
    }
  };

  const leaveChat = useCallback(() => {
    socket.emit('leave', username);
    navigation.goBack();
  }, [username, navigation]);

  const renderItem = (item: any, index: number) => {
    if (item.type === 'system') {
      return <Text style={styles.systemMessage}>{item.message}</Text>;
    }
    const isCurrentUser = item.sender === username;
    const showName = chat[index - 1]?.sender !== item.sender;
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.right : styles.left]}>
        {showName && <Text style={styles.sender}>{item.sender}</Text>}
        <LinearGradient colors={isCurrentUser ? gradient?.colors: ["#e4e4e4","#e4e4e4"]} start={start} end={end} style={[styles.bubble, isCurrentUser ? styles.myBubble : styles.otherBubble]}>
          <Text style={[{fontFamily:font},isCurrentUser ? styles.myText : styles.otherText]}>{item.message}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding' })}>
      <LinearGradient colors={gradient?.colors} start={start} end={end} style={{ height: 75, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, paddingTop: 15 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>{typingUser && <Text style={styles.typing}>{typingUser} is typing...</Text>}</View>
        <View></View>
        <View>
          <TouchableOpacity onPress={() => leaveChat()} style={styles.leaveBtn}>
            <Text style={{ color: 'white',fontFamily:font }}>Leave Chat</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          style={styles.chatList}
          data={chat}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => renderItem(item, index)}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
        <View style={styles.inputRow}>
          <TextInput value={message} onChangeText={(text) => {
            setMessage(text); socket.emit('typing', username);
            if (!text) socket.emit('stop_typing');
          }}
            onBlur={() => socket.emit('stop_typing')}
            onSubmitEditing={sendMessage}
            style={[styles.input,{fontFamily:font}]}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={sendMessage}>
          <LinearGradient colors={gradient?.colors} start={start} end={end} style={styles.sendBtn}>
            <Text style={{ color: 'white',fontFamily:font }}>Send</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 24 },
  chatList: { flex: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 5 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, padding: 10, marginRight: 10 },
  sendBtn: { backgroundColor: '#6200EE', padding: 10, borderRadius: 20 },
  messageContainer: { marginVertical: 5 },
  sender: { fontSize: 12, color: 'gray', marginBottom: 2 },
  bubble: { padding: 10, borderRadius: 20,paddingHorizontal:20 },
  myBubble: { backgroundColor: '#007bff', alignSelf: 'flex-end',borderBottomRightRadius:0 },
  otherBubble: { backgroundColor: '#e4e4e4', alignSelf: 'flex-start',borderBottomLeftRadius:0 },
  leaveBtn: { backgroundColor: 'red', padding: 5, borderRadius: 20, marginTop: 10, alignItems: 'center', width: 100 },
  myText: { color: 'white' },
  otherText: { color: 'black' },
  right: { alignItems: 'flex-end' },
  left: { alignItems: 'flex-start' },
  systemMessage: { textAlign: 'center', fontStyle: 'italic', color: 'gray' },
  typing: { fontStyle: 'italic', color: '#fff' },
});

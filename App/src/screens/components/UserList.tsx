import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserList({ users, onlineStatus }:any) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Online Users</Text>
      {users.map((user:any, i:number) => (
        <View key={i} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: onlineStatus[user] ? 'green' : 'gray' }]} />
          <Text>{user}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10, paddingBottom: 10 },
  header: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 2 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
});

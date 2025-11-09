import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminDashboard = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save user to AsyncStorage when navigated from login
  useEffect(() => {
    const initUser = async () => {
      if (route.params?.user) {
        await AsyncStorage.setItem("user", JSON.stringify(route.params.user));
        setUser(route.params.user);
      } else {
        // Load user from storage
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // No user found, go back to login
          navigation.replace("LoginDashboard");
        }
      }
      setLoading(false);
    };
    initUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user"); // Clear session
    navigation.replace("LoginDashboard");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text>Welcome, {user.name}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  button: { marginTop: 20, backgroundColor: "#007aff", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
});

export default AdminDashboard;

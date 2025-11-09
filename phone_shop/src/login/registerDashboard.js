import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-toast-message";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Toast.show({
        type: title === "Success" ? "success" : "error",
        text1: title,
        text2: message,
        position: "bottom",
      });
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showAlert("Validation", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.132/phone_shop/api.php?path=register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await response.json();

      if (data.error) {
        showAlert("Error", data.error);
      } else {
        showAlert("Success", data.message);
        navigation.navigate("LoginDashboard");
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="name@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f7f7f8", padding: 16 },
  card: { width: "100%", maxWidth: 420, backgroundColor: "#fff", padding: 20, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  label: { fontSize: 14, color: "#333", marginTop: 8 },
  input: { height: 44, borderColor: "#e3e3e3", borderWidth: 1, borderRadius: 6, paddingHorizontal: 10, marginTop: 6, color: "#111" },
  button: { backgroundColor: "#007aff", paddingVertical: 12, borderRadius: 6, marginTop: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
});

export default Register;

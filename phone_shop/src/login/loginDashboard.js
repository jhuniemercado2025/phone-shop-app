import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginDashboard = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === "admin") navigation.replace("AdminDashboard", { user });
        else if (user.role === "employee") navigation.replace("EmployeeDashboard", { user });
        else if (user.role === "customer") navigation.replace("CustomerHome", { user });
      }
      setLoading(false);
    };
    checkSession();
  }, []);

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

  const validateEmail = (value) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      showAlert("Validation", "Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      showAlert("Validation", "Please enter a valid email address");
      return;
    }
    if (!password) {
      showAlert("Validation", "Please enter your password");
      return;
    }
    if (password.length < 6) {
      showAlert("Validation", "Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.132/phone_shop/api.php?path=login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (data.error) {
        showAlert("Error", data.error);
      } else {
        showAlert("Success", data.message);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        // Navigate based on role
        if (data.user.role === "admin") navigation.replace("AdminDashboard", { user: data.user });
        else if (data.user.role === "employee") navigation.replace("EmployeeDashboard", { user: data.user });
        else if (data.user.role === "customer") navigation.replace("CustomerHome", { user: data.user });
        else showAlert("Error", "Unknown role");
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Something went wrong. Try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="name@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Separate text and clickable link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </Text>
        </View>
      </View>

      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f8",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  label: { fontSize: 14, color: "#333", marginTop: 8, alignSelf: "flex-start" },
  input: {
    height: 44,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 6,
    color: "#111",
    width: "100%",
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  signupContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  signupText: { color: "#333" },
  linkText: { color: "#007aff", marginLeft: 4 },
});

export default LoginDashboard;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginDashboard from "./src/login/loginDashboard";
import Register from "./src/login/registerDashboard";
import AdminDashboard from "./src/admin/adminDashboard";
import EmployeeDashboard from "./src/employee/employeeDashboard";
import CustomerDashboard from "./src/customer/customerDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="LoginDashboard">
        <Stack.Screen
          name="LoginDashboard"
          component={LoginDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            title: "", // Optional: remove text title
            headerTintColor: "#007aff", // Back arrow color
            headerStyle: { backgroundColor: "#f7f7f8" }, // Header background
            headerShadowVisible: false, // Remove line/shadow under header
            headerBackTitleVisible: false, // Remove back button text on iOS
          }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmployeeDashboard"
          component={EmployeeDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerDashboard"
          component={CustomerDashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

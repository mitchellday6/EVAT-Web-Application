import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  GestureResponderEvent,
} from "react-native";

// Define props type
interface NavBarProps {
  searchFunction: (event: GestureResponderEvent) => void;
  settingsFunction: (event: GestureResponderEvent) => void;
}

const NavBar: React.FC<NavBarProps> = ({ searchFunction, settingsFunction }) => {
  return (
    <View style={styles.navbar}>
      {/* Search Button */}
      <TouchableOpacity style={styles.navbutton} onPress={searchFunction}>
        <Image style={styles.navbarIcon} source={require("../data/search.webp")} />
        <Text style={styles.navbuttonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.verticleLine}></View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.navbutton} onPress={settingsFunction}>
        <Image style={styles.navbarIcon} source={require("../data/config.webp")} />
        <Text style={styles.navbuttonText}>Settings</Text>
      </TouchableOpacity>

      <View style={styles.verticleLine}></View>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.navbutton}
        onPress={() => console.log("Sign out clicked")}
      >
        <Image style={styles.navbarIcon} source={require("../data/signout.webp")} />
        <Text style={styles.navbuttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: Dimensions.get("window").width,
    height: 50,
    backgroundColor: "#2e9963",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  navbutton: {
    width: Dimensions.get("window").width / 3,
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
  },
  verticleLine: {
    height: "60%",
    width: 2,
    backgroundColor: "#DDD",
  },
  navbuttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  navbarIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
});

export default NavBar;

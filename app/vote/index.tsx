import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const [serialNumber, setSerialNumber] = useState("");
  const textInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Masukkan Serial Number</Text>

      <Text style={styles.addressLabel}>Serial Number</Text>
      <View style={styles.address_input}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan serial number"
          placeholderTextColor="#697D95"
          value={serialNumber}
          onChangeText={setSerialNumber}
          ref={textInputRef}
          autoCorrect={false}
          onFocus={handlePress}
        />
      </View>

      <Link href={{ pathname: "/vote/pin", params: { serialNumber } }} asChild>
        <TouchableOpacity style={styles.label_bt}>
          <Text style={styles.labelText}>Nextl</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
    backgroundColor: "white",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "CircularStd-Bold",
    fontWeight: "bold",
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#252a31",
  },
  addressLabel: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.03,
    color: "#252a31",
    marginLeft: "6%",
    marginTop: "10%",
    alignSelf: "flex-start",
  },
  address_input: {
    backgroundColor: "#e8edf1",
    marginTop: "2%",
    paddingHorizontal: "4%",
    width: "90%",
    height: height * 0.06,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    color: "black",
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.035,
    flex: 1,
  },
  clipboardButton: {
    padding: 5,
  },
  clipboardImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  label_bt: {
    backgroundColor: "#ecf8f7",
    marginTop: "8%",
    width: "90%",
    height: height * 0.06,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    color: "#007f6d",
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.035,
  },
});

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
import * as Clipboard from "expo-clipboard";
import { Link } from "expo-router";

export default function Index() {
  const [address, setAddress] = useState("");
  const textInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setAddress(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Masukkan Address</Text>

      <Text style={styles.subText}>
        Pastikan Anda sudah menyalin address ke{"\n"}
        clipboard.
      </Text>

      <Text style={styles.addressLabel}>Address</Text>

      <View style={styles.address_input}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan address"
          placeholderTextColor="#697D95"
          value={address}
          onChangeText={setAddress}
          ref={textInputRef}
          autoCorrect={false}
          onFocus={handlePress}
        />
        <TouchableOpacity
          onPress={fetchCopiedText}
          style={styles.clipboardButton}
        >
          <Image
            source={require("../../assets/images/ClipboardText.png")}
            style={styles.clipboardImage}
          />
        </TouchableOpacity>
      </View>

      <Link href={"/lacak/riwayat"} asChild>
        <TouchableOpacity style={styles.label_bt}>
          <Text style={styles.labelText}>Label</Text>
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
  subText: {
    fontFamily: "CircularStd-Book",
    color: "#4f5e71",
    textAlign: "center",
    marginTop: "2%",
    fontSize: width * 0.035,
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

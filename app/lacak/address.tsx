import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios, { AxiosError } from "axios";

export default function Address() {
  const [transactionAddress, setTransactionAddress] = useState("");
  const textInputRef = useRef<TextInput>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const nfcSerialNumber = id;

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setTransactionAddress(text);
  };

  const handleAPI = () => {
    const payload = {
      nfcSerialNumber,
      transactionAddress,
    };

    axios
      .post(process.env.EXPO_PUBLIC_API_URL + "/voter/search", payload)
      .then((res) => {
        router.push({
          pathname: "/lacak/riwayat",
          params: { response: JSON.stringify(res.data) },
        });
      })
      .catch((error: any) => {
        if (error instanceof AxiosError) {
          console.error(error);
          if (error.response?.data.statusCode !== 500) {
            Alert.alert("", "Kode Unik Tidak Sesuai", [{ text: "OK" }]);
          } else {
            Alert.alert("", "Tidak Dapat terhubung", [{ text: "OK" }]);
          }
        } else {
          Alert.alert("", "Tidak Dapat terhubung", [{ text: "OK" }]);
        }
      });
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Masukkan Kode Unik</Text>

        <Text style={styles.subText}>
          Pastikan Anda sudah menyalin kode unik ke{"\n"}
          clipboard.
        </Text>

        <Text style={styles.addressLabel}>Kode Unik</Text>

        <View style={styles.address_input}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Masukkan kode unik"
            placeholderTextColor="#697D95"
            value={transactionAddress}
            onChangeText={setTransactionAddress}
            ref={textInputRef}
            autoCorrect={false}
            onFocus={handlePress}
          />
          <TouchableOpacity
            onPress={fetchCopiedText}
            style={styles.clipboardButton}
          >
            <Image
              source={require("../../assets/images/Clipboard.png")}
              style={styles.clipboardImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.label_bt} onPress={handleAPI}>
          <Text style={styles.labelText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </>
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
    lineHeight: 20
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

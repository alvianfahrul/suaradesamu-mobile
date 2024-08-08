import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import axios, { AxiosError } from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function Verif() {
  const { response = "{}" } = useLocalSearchParams<{ response?: string }>();
  const responseData = JSON.parse(response);
  const { data } = responseData;
  const { nfcSerialNumber, name } = data;

  const handleAPI = () => {
    const payload = {
      nfcSerialNumber,
    };

    axios
      .post(process.env.EXPO_PUBLIC_API_URL + "/voter/can-vote", payload)
      .then((res) => {
        router.push({
          pathname: "/vote/pilih",
          params: { nfcSerialNumber: nfcSerialNumber, name: name },
        });
      })
      .catch((error: any) => {
        if (error instanceof AxiosError) {
          console.error(error);
          Alert.alert("", "Anda Sudah Melakukan Pemilihan", [
            { text: "OK", onPress: () => router.dismissAll() },
          ]);
        } else {
          Alert.alert("", "Gagal Terhubung Ke Server", [{ text: "OK" }]);
        }
      });
  };

  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/Feedback.png")}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Selamat Datang, {name}</Text>

          <Text style={styles.subText}>
            PIN Anda berhasil diverifikasi. Sekarang Anda bisa melanjutkan untuk
            melakukan pemilihan.
          </Text>

          <Link
            href={{
              pathname: "vote/pilih",
              params: { nfcSerialNumber: nfcSerialNumber, name: name },
            }}
            asChild
          >
            <TouchableOpacity
              style={styles.lanjutkan_bt}
              onPress={() => {
                handleAPI();
              }}
            >
              <Text style={styles.lanjutkan_text}>Lanjutkan</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "25%",
    backgroundColor: "white",
    alignItems: "center",
  },
  headerImage: {
    width: "50%",
    height: "25%",
    marginBottom: "5%",
  },
  headerText: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.045,
    textAlign: "center",
    color: "#000",
  },
  subText: {
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#4f5e71",
    marginTop: "5%",
    lineHeight: 25,
  },
  private_key_label: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.03,
    color: "#252a31",
    marginLeft: "6%",
    marginTop: "5%",
    alignSelf: "flex-start",
  },
  private_key_input: {
    backgroundColor: "#fafafa",
    marginTop: "2%",
    paddingHorizontal: "4%",
    width: "90%",
    height: height * 0.06,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  input: {
    color: "#697d95",
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.035,
  },
  clipboardButton: {
    padding: 5,
  },
  clipboardImage: {
    width: 24,
    height: 24,
  },
  help_wrapper: {
    backgroundColor: "#fff",
    width: "90%",
    marginTop: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  glyphImage: {
    width: 20,
    height: 20,
    marginRight: "2%",
    marginBottom: "2%",
  },
  help_text: {
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.03,
    color: "#a3a3a3",
    lineHeight: 20,
  },
  lanjutkan_bt: {
    backgroundColor: "#00A58E",
    padding: "3%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "5%",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
  },
  lanjutkan_text: {
    color: "#fff",
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.04,
  },
});

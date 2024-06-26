import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";

export default function Verif() {
  const [privateKey, setPrivateKey] = useState("Test");
  const { response = "{}" } = useLocalSearchParams<{ response?: string }>();
  const responseData = JSON.parse(response);
  const { data } = responseData;
  const { NIK, name } = data;

  /* function showToast() {
    ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(privateKey);
    showToast();
  }; */

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/WomanWithPhone.png")}
        style={styles.headerImage}
      />
      <Text style={styles.headerText}>Verifikasi Data Diri</Text>

      <Text style={styles.private_key_label}>NIK</Text>
      <View style={styles.private_key_input}>
        <TextInput
          style={styles.input}
          value={NIK}
          editable={false}
        />
      </View>

      <Text style={styles.private_key_label}>Nama</Text>
      <View style={styles.private_key_input}>
        <TextInput
          style={styles.input}
          value={name}
          editable={false}
        />
      </View>

      {/* <View style={styles.help_wrapper}>
        <Image
          source={require("../../assets/images/Glyph.png")}
          style={styles.glyphImage}
        />
        <Text style={styles.help_text}>
          Harap salin address berikut ke clipboard Anda untuk melihat histori
          pemilihan Anda.
        </Text>
      </View> */}

      <Link href={{pathname: "vote/pilih", params: { nik: NIK, name: name }}} asChild>
        <TouchableOpacity style={styles.lanjutkan_bt}>
          <Text style={styles.lanjutkan_text}>Lanjutkan</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
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
    backgroundColor: "#00a58e",
    marginTop: "8%",
    width: "90%",
    height: height * 0.055,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  lanjutkan_text: {
    color: "#fff",
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.04,
  },
});

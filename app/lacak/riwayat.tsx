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
import { StatusBar } from "expo-status-bar";
import * as Clipboard from "expo-clipboard";

export default function Riwayat() {
  const { response = "{}" } = useLocalSearchParams<{ response?: string }>();
  const responseData = JSON.parse(response);
  const { date, time, candidateNumber, candidateName, transactionAddress } =
    responseData.data;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(transactionAddress);
    ToastAndroid.show(
      "Transaction Hash copied to clipboard",
      ToastAndroid.SHORT
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Riwayat Pemilihan</Text>

        <Text style={styles.subText}>
          Anda sudah menggunakan hak pilih Anda
        </Text>

        <Text style={styles.addressLabel}>Tanggal</Text>
        <View style={styles.address_input}>
          <TextInput
            style={styles.input}
            value={date}
          />
        </View>

        <Text style={styles.addressLabel}>Pukul</Text>
        <View style={styles.address_input}>
          <TextInput
            style={styles.input}
            value={time}
            editable={false}
          />
        </View>

        <Text style={styles.addressLabel}>Calon Pilihan</Text>
        <View style={styles.address_input}>
          <TextInput
            style={styles.input}
            value={candidateName}
            editable={false}
          />
        </View>

        <Text style={styles.addressLabel}>No. Urut</Text>
        <View style={styles.address_input}>
          <TextInput
            style={styles.input}
            value={candidateNumber}
            editable={false}
          />
        </View>

        <Text style={styles.addressLabel}>Transaction Hash</Text>
        <View style={styles.address_input}>
          <TextInput
            style={styles.input}
            value={transactionAddress}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => {
              copyToClipboard();
            }}
            style={styles.clipboardButton}
          >
            <Image
              source={require("../../assets/images/Clipboard.png")}
              style={styles.clipboardImage}
            />
          </TouchableOpacity>
        </View>

        <Link href={"/"} asChild>
          <TouchableOpacity style={styles.selesai_bt}>
            <Text style={styles.selesai_text}>Selesai</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
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
  headerText: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.045,
    textAlign: "center",
    color: "#000",
  },
  subText: {
    fontFamily: "CircularStd-Book",
    color: "#344054",
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "7%",
    fontSize: width * 0.035,
  },
  addressLabel: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.03,
    color: "#252a31",
    marginLeft: "6%",
    marginTop: "5%",
    alignSelf: "flex-start",
  },
  address_input: {
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
    resizeMode: "contain",
  },
  selesai_bt: {
    backgroundColor: "#00a58e",
    marginTop: "8%",
    width: "90%",
    height: height * 0.06,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selesai_text: {
    color: "#fff",
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.04,
  },
});

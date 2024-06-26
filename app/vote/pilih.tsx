import axios from "axios";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from "react-native";

export default function Pilih() {
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [isCloseButtonPressed, setIsCloseButtonPressed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const handleCardPress = (name: string) => {};
  const { nik, name } = useLocalSearchParams<{ nik: string; name: string }>();

  const candidateId = selectedCard;

  const handleAPI = () => {
    const payload = {
      nik,
      candidateId,
    };
    axios
      .post(process.env.EXPO_PUBLIC_API_URL + "/voter/vote", payload)
      .then((res) => {
        setSecondModalVisible(true);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Error",
          "There was an error making the request. Please try again later.",
          [{ text: "OK" }]
        );
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/WomanWithMan.png")}
        style={styles.headerImage}
      />
      <Text style={styles.headerText}>Pilih Calon Favorit Anda</Text>

      <View style={styles.card_wrapper}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleCardPress("Jefri Kurniawan");
            setSelectedCard(1);
          }}
        >
          <View
            style={[
              styles.card,
              {
                borderColor: selectedCard == 1 ? "#00a58e" : "#dedede",
                backgroundColor: selectedCard == 1 ? "#d4e9e7" : "#fafafa",
              },
            ]}
          >
            <View style={styles.cardContent}>
              <Image
                source={require("../../assets/images/foto_jefri.png")}
                style={[
                  styles.cardImage,
                  { backgroundColor: selectedCard == 1 ? "#fff" : "#e7e8e7" },
                ]}
              />
              <View
                style={[
                  styles.numberContainer,
                  {
                    backgroundColor: selectedCard == 1 ? "#00a58e" : "#a3a3a3",
                  },
                ]}
              >
                <Text style={styles.numberText}>1</Text>
              </View>
              <Text style={styles.nameText}>Jefri Kurniawan</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            handleCardPress("Yusuf Bahrudin");
            setSelectedCard(2);
          }}
        >
          <View
            style={[
              styles.card,
              {
                borderColor: selectedCard == 2 ? "#00a58e" : "#dedede",
                backgroundColor: selectedCard == 2 ? "#d4e9e7" : "#fafafa",
              },
            ]}
          >
            <View style={styles.cardContent}>
              <Image
                source={require("../../assets/images/foto_yusuf.png")}
                style={[
                  styles.cardImage,
                  { backgroundColor: selectedCard == 2 ? "#fff" : "#e7e8e7" },
                ]}
              />
              <View
                style={[
                  styles.numberContainer,
                  {
                    backgroundColor: selectedCard == 2 ? "#00a58e" : "#a3a3a3",
                  },
                ]}
              >
                <Text style={styles.numberText}>2</Text>
              </View>
              <Text style={styles.nameText}>Yusuf Bahrudin</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={[styles.card_wrapper, { justifyContent: "center" }]}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleCardPress("Agus Susio D");
            setSelectedCard(3);
          }}
        >
          <View
            style={[
              styles.card,
              {
                borderColor: selectedCard == 3 ? "#00a58e" : "#dedede",
                backgroundColor: selectedCard == 3 ? "#d4e9e7" : "#fafafa",
              },
            ]}
          >
            <View style={styles.cardContent}>
              <Image
                source={require("../../assets/images/foto_agus.png")}
                style={[
                  styles.cardImage,
                  { backgroundColor: selectedCard == 3 ? "#fff" : "#e7e8e7" },
                ]}
              />
              <View
                style={[
                  styles.numberContainer,
                  {
                    backgroundColor: selectedCard == 3 ? "#00a58e" : "#a3a3a3",
                  },
                ]}
              >
                <Text style={styles.numberText}>3</Text>
              </View>
              <Text style={styles.nameText}>Agus Susilo D</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity
        style={styles.lanjutkan_bt}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.lanjutkan_text}>Lanjutkan</Text>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalOverlay} />
          <View style={styles.modalView}>
            <Image
              source={require("../../assets/images/Success.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Yakin dengan pilihan Anda?</Text>
            <Text style={styles.modalSubText}>
              Sebelum mengirimkan suara Anda, pastikan bahwa informasi data diri
              dan calon pilihan Anda sudah sesuai
            </Text>
            <TouchableHighlight
              underlayColor="#d21c1c"
              style={styles.modalButtonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIsCloseButtonPressed(false);
              }}
              onShowUnderlay={() => setIsCloseButtonPressed(true)}
              onHideUnderlay={() => setIsCloseButtonPressed(false)}
            >
              <Text
                style={[
                  styles.modalButtonCloseText,
                  isCloseButtonPressed && { color: "#fff" },
                ]}
              >
                Batalkan
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#02bca2"
              style={styles.modalButton}
              onPress={() => {
                handleAPI();
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Kirim suara</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModalVisible}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalOverlay} />
          <View style={styles.modalView}>
            <Image
              source={require("../../assets/images/Mailbox.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Terima kasih!</Text>
            <Text style={styles.modalSubText}>
              Anda telah berhasil menggunakan hak suara Anda.
            </Text>
            <Text style={styles.modalSubText}>{"NIK: " + nik}</Text>
            <Text style={styles.modalSubText}>{"Nama: " + name}</Text>
            <Text style={styles.modalSubText}>
              {"Nomor Pilihan: " + selectedCard}
            </Text>
            <TouchableHighlight
              style={styles.modalButton}
              underlayColor="#00d3b7"
              onPress={() => {
                setSecondModalVisible(false); // Menutup modal kedua
                router.replace("/"); // Pindah ke halaman login
              }}
            >
              <Text style={styles.modalButtonText}>Selesai</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
    width: 160,
    height: 150,
    marginBottom: "5%",
  },
  headerText: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.045,
    textAlign: "center",
    color: "#000",
    marginBottom: "5%",
  },
  card_wrapper: {
    width: "85%",
    height: "25%",
    padding: "1%",
    marginBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  card: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#dedede",
    backgroundColor: "#fafafa",
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: "#e7e8e7",
    borderRadius: 50,
    marginBottom: "10%",
  },
  numberContainer: {
    backgroundColor: "#a3a3a3",
    paddingHorizontal: "8%",
    paddingVertical: "2%",
    borderRadius: 10,
    marginBottom: "5%",
  },
  numberText: {
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.035,
    color: "#fff",
  },
  nameText: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.035,
    color: "#717070",
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
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "50%",
  },
  modalImage: {
    width: "65%",
    height: "30%",
    marginBottom: "5%",
  },
  modalText: {
    fontFamily: "CircularStd-Bold",
    fontSize: width * 0.04,
    color: "#252a31",
    marginBottom: "5%",
  },
  modalSubText: {
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.034,
    color: "#4f5e71",
    marginBottom: "10%",
    textAlign: "center",
    lineHeight: 20,
  },
  modalButtonClose: {
    backgroundColor: "#fcf3f3",
    borderRadius: 10,
    padding: "5%",
    width: "100%",
    alignItems: "center",
    marginBottom: "8%",
  },
  modalButtonCloseText: {
    fontFamily: "CircularStd-Medium",
    color: "#890b0b",
  },
  modalButton: {
    backgroundColor: "#00a58e",
    borderRadius: 10,
    padding: "5%",
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    fontFamily: "CircularStd-Medium",
    color: "#fff",
  },
});

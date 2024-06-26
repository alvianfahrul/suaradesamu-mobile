import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Modal,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function Pin() {
  const [fontsLoaded] = useFonts({
    "CircularStd-Black": require("../../assets/fonts/CircularStd-Black.ttf"),
    "CircularStd-Book": require("../../assets/fonts/CircularStd-Book.ttf"),
    "CircularStd-Bold": require("../../assets/fonts/CircularStd-Bold.ttf"),
    "CircularStd-Medium": require("../../assets/fonts/CircularStd-Medium.ttf"),
    "TT Commons Regular": require("../../assets/fonts/TT Commons Regular.otf"),
    "TT Commons DemiBold": require("../../assets/fonts/TT Commons DemiBold.otf"),
  });

  const [pin, setPin] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isCloseButtonPressed, setIsCloseButtonPressed] = useState(false);
  const { serialNumber } = useLocalSearchParams<{ serialNumber: string }>();
  const nfcSN = serialNumber;
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handlePressNumber = (number: string) => {
    setPin((prevAddress) => prevAddress + number);
  };

  const handleDelete = () => {
    setPin((prevAddress) => prevAddress.slice(0, -1));
  };

  const handleAPI = () => {
    const payload = {
      nfcSN,
      pin,
    };

    axios
      .post(process.env.EXPO_PUBLIC_API_URL + "/voter/register", payload)
      .then((res) => {
        router.push({
          pathname: "/vote/verif",
          params: { response: JSON.stringify(res.data) },
        });
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
      <Text style={styles.headerText}>Masukkan PIN Undangan</Text>

      <Text style={styles.subText}>Pastikan Anda sudah menerima undangan</Text>
      <Text style={styles.subText}>beserta PIN</Text>

      <View style={styles.pin_input}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan PIN"
          placeholderTextColor="#697D95"
          value={pin}
          onChangeText={setPin}
          autoCorrect={false}
          editable={false}
        />
      </View>

      <View style={styles.bt_number_wrapper}>
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.bt_number}
            onPress={() => handlePressNumber(num.toString())}
          >
            <Text style={styles.bt_number_text}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bt_number_wrapper}>
        {[4, 5, 6].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.bt_number}
            onPress={() => handlePressNumber(num.toString())}
          >
            <Text style={styles.bt_number_text}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bt_number_wrapper}>
        {[7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.bt_number}
            onPress={() => handlePressNumber(num.toString())}
          >
            <Text style={styles.bt_number_text}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bt_number_wrapper}>
        <TouchableOpacity style={styles.bt_number} onPress={handleDelete}>
          <Text style={styles.bt_number_text}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bt_number}
          onPress={() => handlePressNumber("0")}
        >
          <Text style={styles.bt_number_text}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bt_number} onPress={handleAPI}>
          <Text style={styles.bt_number_text}>OK</Text>
        </TouchableOpacity>
      </View>

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
              source={require("../../assets/images/Error.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>
              Apakah Anda yakin ingin mengakhiri proses ini?
            </Text>
            <Text style={styles.modalSubText}>
              Anda akan diarahkan ke halaman utama jika mengakhiri proses ini.
            </Text>
            <TouchableHighlight
              underlayColor="#d21c1c"
              style={styles.modalButtonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIsCloseButtonPressed(false);
                router.dismissAll();
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
                Akhiri
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#02bca2"
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Tetap di sini</Text>
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
    paddingTop: "20%",
    backgroundColor: "white",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "CircularStd-Bold",
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#252a31",
    marginBottom: "2%",
  },
  subText: {
    fontFamily: "CircularStd-Book",
    color: "#4f5e71",
    textAlign: "center",
    marginTop: "1%",
    fontSize: width * 0.035,
  },
  pin_input: {
    backgroundColor: "#e8edf1",
    marginTop: "15%",
    paddingHorizontal: "5%",
    width: "70%",
    height: height * 0.06,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
  input: {
    color: "black",
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.035,
    flex: 1,
  },
  bt_number_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    height: "10%",
    marginBottom: "5%",
  },
  bt_number: {
    backgroundColor: "#f5f5f5",
    width: "25%",
    height: "100%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c1c6cb",
  },
  bt_number_text: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.05,
    color: "#a3a3a3",
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

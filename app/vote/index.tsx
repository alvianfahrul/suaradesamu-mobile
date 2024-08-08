import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableHighlight,
} from "react-native";
import NfcManager, { NfcTech, TagEvent } from "react-native-nfc-manager";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function Index() {
  const [tag, setTag] = useState<TagEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCloseButtonPressed, setIsCloseButtonPressed] = useState(false);
  const router = useRouter();

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      setTag(tag);
      console.warn("Tag found", tag);

      // Check if tag is not null before navigating
      if (tag && tag.id) {
        setShowModal(false);
        // Navigate to the verification page with the tag ID
        router.push({
          pathname: "/vote/pin",
          params: { id: tag.id },
        });
      }
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const handlePress = () => {
    setShowModal(true);
    readNdef();
  };

  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <View style={styles.wrapper}>
          <Text style={styles.headerText}>Menyiapkan NFC</Text>
          <Text style={styles.subText}>
            Sebelum memilih, pastikan NFC Anda siap digunakan
          </Text>
          <Image
            source={require("../../assets/images/Feedback.png")}
            style={styles.headerImage}
          />
          <TouchableOpacity
            style={styles.scan_bt}
            onPress={() => {
              handlePress();
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: width * 0.038,
                fontFamily: "CircularStd-Medium",
              }}
            >
              Scan KTP
            </Text>
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={showModal}>
            <View style={styles.modalWrapper}>
              <View style={styles.modalOverlay} />
              <View style={styles.modalView}>
                <Image
                  source={require("../../assets/images/Net Verify.png")}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>Tap KTP</Text>
                <Text style={styles.modalSubText}>
                  Silakan arahkan KTP Anda ke ponsel.
                </Text>
                <TouchableHighlight
                  style={styles.modalButtonClose}
                  underlayColor="#d21c1c"
                  onPress={() => {
                    setShowModal(false);
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
              </View>
            </View>
          </Modal>
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: "15%",
  },
  container: {
    top: "10%",
  },
  headerText: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.04,
    marginBottom: "5%",
  },
  subText: {
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.035,
    color: "#344054",
    marginBottom: "5%",
  },
  headerImage: {
    width: "50%",
    height: "25%",
    marginBottom: "5%",
  },
  scan_bt: {
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
    paddingHorizontal: "10%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "40%",
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

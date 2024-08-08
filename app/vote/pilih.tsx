import axios, { AxiosError } from "axios";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export default function Pilih() {
  const [fontsLoaded] = useFonts({
    "CircularStd-Black": require("../../assets/fonts/CircularStd-Black.ttf"),
    "CircularStd-Book": require("../../assets/fonts/CircularStd-Book.ttf"),
    "CircularStd-Bold": require("../../assets/fonts/CircularStd-Bold.ttf"),
    "CircularStd-Medium": require("../../assets/fonts/CircularStd-Medium.ttf"),
    "TT Commons Regular": require("../../assets/fonts/TT Commons Regular.otf"),
    "TT Commons DemiBold": require("../../assets/fonts/TT Commons DemiBold.otf"),
  });
  interface Profile {
    id: number;
    name: string;
    age: number;
    noUrut: number;
    visi: string;
    photoProfileUrl: string;
    photoProfileAlt: string;
    createdAt: string;
    updatedAt: string;
  }
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [isCloseButtonPressed, setIsCloseButtonPressed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const { nfcSerialNumber } = useLocalSearchParams<{
    nfcSerialNumber: string;
    name: string;
  }>();

  const [candidateId, setCandidateId] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + "/candidate"
        );
        const json = await response.json();
        if (json.success) {
          setProfiles(json.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleAPI = () => {
    const payload = {
      nfcSerialNumber,
      candidateId,
    };
    axios
      .post(process.env.EXPO_PUBLIC_API_URL + "/voter/vote", payload)
      .then((res) => {
        setApiResponse(res.data.data.transactionAddress);
        setSecondModalVisible(true);
      })
      .catch((error: any) => {
        if (error instanceof AxiosError) {
          console.error(error);
          Alert.alert("", "Gagal Melakukan Voting", [
            { text: "OK", onPress: () => router.dismissAll() },
          ]);
        } else {
          Alert.alert("", "Gagal Terhubung Ke Server", [{ text: "OK" }]);
        }
      });
  };

  const renderRows = (profiles: Profile[]) => {
    const rows = [];
    for (let i = 0; i < profiles.length; i += 2) {
      rows.push(
        <View style={styles.card_row} key={i}>
          {profiles.slice(i, i + 2).map((profile) => (
            <TouchableWithoutFeedback
              key={profile.id}
              onPress={() => {
                setSelectedCard(profile.noUrut);
              }}
            >
              <View
                style={[
                  styles.card,
                  {
                    borderColor:
                      selectedCard == profile.noUrut ? "#00a58e" : "#dedede",
                    backgroundColor:
                      selectedCard == profile.noUrut ? "#d4e9e7" : "#fafafa",
                  },
                ]}
              >
                <View style={styles.cardContent}>
                  <Image
                    source={{ uri: profile.photoProfileUrl }}
                    style={[
                      styles.cardImage,
                      {
                        backgroundColor:
                          selectedCard == profile.noUrut ? "#fff" : "#e7e8e7",
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.numberContainer,
                      {
                        backgroundColor:
                          selectedCard == profile.noUrut
                            ? "#00a58e"
                            : "#a3a3a3",
                      },
                    ]}
                  >
                    <Text style={styles.numberText}>{profile.noUrut}</Text>
                  </View>
                  <Text style={styles.nameText}>{profile.name}</Text>
                  <Link href={`profile/${profile.id}`} asChild>
                    <TouchableOpacity style={styles.profil_bt}>
                      <Text style={styles.profil_bt_text}>Detail Kandidat</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );
    }
    return rows;
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(apiResponse);
    ToastAndroid.show("Address copied to clipboard", ToastAndroid.SHORT);
  };

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#00a58e" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/WomanWithMan.png")}
              style={styles.headerImage}
            />
            <Text style={styles.headerText}>Pilih Calon Favorit Anda</Text>

            <View style={styles.card_wrapper}>{renderRows(profiles)}</View>

            <View style={styles.lanjutkan_bt_wrapper}>
              <TouchableOpacity
                style={styles.lanjutkan_bt}
                onPress={() => {
                  setModalVisible(true);
                  setCandidateId(profiles[selectedCard - 1].id);
                }}
              >
                <Text style={styles.lanjutkan_text}>Lanjutkan</Text>
              </TouchableOpacity>
            </View>

            {profiles.length > 0 && selectedCard > 0 && (
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
                      source={{
                        uri: profiles[selectedCard - 1].photoProfileUrl,
                      }}
                      style={styles.modalImage}
                    />
                    <Text style={styles.modalText}>
                      Yakin dengan pilihan Anda?
                    </Text>
                    <Text style={styles.modalSubText}>
                      {"No. Urut : " + selectedCard}
                      {"\n"}
                      {"Nama : " + profiles[selectedCard - 1].name}
                    </Text>
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
                  </View>
                </View>
              </Modal>
            )}

            {secondModalVisible && (
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
                      Hak suara Anda telah berhasil digunakan. Untuk melihat
                      riwayat pemilihan, tekan 'Salin Kode Unik' untuk menyalin.
                    </Text>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        copyToClipboard();
                      }}
                    >
                      <Text style={styles.modalButtonText}>Salin Kode Unik</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalSalinButton}
                      onPress={() => {
                        setSecondModalVisible(false);
                        router.dismissAll();
                      }}
                    >
                      <Text style={styles.modalSalinButtonText}>Tutup</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    paddingBottom: "5%",
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
    marginBottom: "7%",
  },
  card_wrapper: {
    width: "90%",
    marginBottom: "7%",
  },
  card_row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "7%",
  },
  card: {
    width: "40%",
    padding: "2%",
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
    width: 75,
    height: 75,
    backgroundColor: "#e7e8e7",
    borderRadius: 50,
    marginBottom: "10%",
  },
  numberContainer: {
    backgroundColor: "#a3a3a3",
    paddingHorizontal: "8%",
    paddingVertical: "2%",
    borderRadius: 10,
    marginBottom: "10%",
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
  visi_misi_text: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.035,
    color: "#717070",
  },
  profil_bt: {
    backgroundColor: "#ecf8f7",
    borderRadius: 10,
    padding: "5%",
    width: "100%",
    alignItems: "center",
    marginTop: "5%",
  },
  profil_bt_text: {
    fontFamily: "CircularStd-Medium",
    color: "#007f6d",
  },
  lanjutkan_bt_wrapper: {
    bottom: 0,
    width: "100%",
    marginBottom: "3%",
  },
  lanjutkan_bt: {
    backgroundColor: "#00A58E",
    padding: "3%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
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
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "50%",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: "5%",
    borderRadius: 50,
    backgroundColor: "#e7e8e7",
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
    textAlign: "center",
    lineHeight: 25,
    marginBottom: "5%",
  },
  modalButtonClose: {
    backgroundColor: "#fcf3f3",
    borderRadius: 10,
    padding: "5%",
    width: "100%",
    alignItems: "center",
    marginTop: "5%",
  },
  modalButtonCloseText: {
    fontFamily: "CircularStd-Medium",
    color: "#890b0b",
  },
  modalSalinButton: {
    backgroundColor: "#ecf8f7",
    borderRadius: 10,
    padding: "5%",
    width: "100%",
    alignItems: "center",
    marginTop: "5%",
  },
  modalSalinButtonText: {
    fontFamily: "CircularStd-Medium",
    color: "#007f6d",
  },
  modalButton: {
    backgroundColor: "#00a58e",
    borderRadius: 10,
    padding: "5%",
    width: "100%",
    alignItems: "center",
    marginTop: "5%",
  },
  modalButtonText: {
    fontFamily: "CircularStd-Medium",
    color: "#fff",
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
});

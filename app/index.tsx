import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { BarChart } from "react-native-gifted-charts";
import { Link, router } from "expo-router";
import axios from "axios";

export default function Index() {
  interface BarData {
    value: number;
    label: string;
    frontColor: string;
    topLabelComponent: () => JSX.Element;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [totalSuaraMasuk, setTotalSuaraMasuk] = useState(0);
  const [formattedData, setFormattedData] = useState<
    { label: string; value: number }[]
  >([]);
  const [barData, setBarData] = useState<BarData[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [votingRun, setVotingRun] = useState(false);
  const [totalPemilih, setTotalPemilih] = useState(0);

  const [fontsLoaded] = useFonts({
    "CircularStd-Black": require("../assets/fonts/CircularStd-Black.ttf"),
    "CircularStd-Book": require("../assets/fonts/CircularStd-Book.ttf"),
    "CircularStd-Bold": require("../assets/fonts/CircularStd-Bold.ttf"),
    "CircularStd-Medium": require("../assets/fonts/CircularStd-Medium.ttf"),
    "TT Commons Regular": require("../assets/fonts/TT Commons Regular.otf"),
  });

  const onRefresh = React.useCallback(() => {
    fetchData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    router.replace("/");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_API_URL + "/voting/real-count"
      );
      const { totalPemilih, totalSuaraMasuk, isVotingRun, candidateVotesData } =
        response.data.data;

      const formattedData = candidateVotesData.map(
        (item: { voteCount: any; name: any }) => ({
          value: item.voteCount,
          label: item.name,
        })
      );

      setTotalPemilih(totalPemilih);
      setTotalSuaraMasuk(totalSuaraMasuk);
      setVotingRun(isVotingRun);
      setFormattedData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data = [];

    if (votingRun) {
      data = formattedData.map((item, index) => ({
        value: 0,
        label: item.label,
        frontColor: index % 2 === 0 ? "#cedeea" : "#b7deda",
        topLabelComponent: () => (
          <Text
            style={{
              color: "#2f3f57",
              fontSize: 14,
              fontFamily: "CircularStd-Medium",
              marginBottom: "10%",
            }}
          >
            0
          </Text>
        ),
      }));
    } else {
      data = formattedData.map((item, index) => ({
        value: item.value,
        label: item.label,
        frontColor: index % 2 === 0 ? "#cedeea" : "#b7deda",
        topLabelComponent: () => (
          <Text
            style={{
              color: "#2f3f57",
              fontSize: 14,
              fontFamily: "CircularStd-Medium",
              marginBottom: "10%",
            }}
          >
            {item.value}
          </Text>
        ),
      }));
    }

    data.push({
      value: totalSuaraMasuk,
      label: "Total",
      frontColor: "#ffd748",
      topLabelComponent: () => (
        <Text
          style={{
            color: "#2f3f57",
            fontSize: 14,
            fontFamily: "CircularStd-Medium",
            marginBottom: "10%",
          }}
        >
          {totalSuaraMasuk}
        </Text>
      ),
    });

    setBarData(data);
  }, [formattedData, totalSuaraMasuk, votingRun]);

  const handleVoteButtonPress = () => {
    fetchData();
    if (votingRun) {
      setModalVisible(true);
    } else {
      Alert.alert("", "Voting Belum Dimulai", [{ text: "OK" }]);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>SuaraDesamu</Text>
          <Text style={styles.subtitle}>Mudah, Aman, Transparan</Text>

          <Link href="/lacak" asChild>
            <TouchableOpacity style={styles.search_bt}>
              <Image
                source={require("../assets/images/MagnifyingGlass.png")}
                style={{ width: "5%", height: "100%" }}
              />
              <Text
                style={{
                  color: "#a3a3a3",
                  fontFamily: "CircularStd-Book",
                  fontSize: width * 0.03,
                  marginLeft: "3%",
                }}
              >
                Lacak riwayat pemilihan
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.profil_bt}>
              <Image
                source={require("../assets/images/IconWrapper.png")}
                style={{ width: "5%", height: "70%", marginLeft: "2%" }}
              />
              <View style={{ marginLeft: "5%" }}>
                <Text
                  style={{
                    color: "#252a31",
                    fontFamily: "CircularStd-Bold",
                    fontSize: width * 0.037,
                    fontWeight: "bold",
                  }}
                >
                  Profil Kandidat
                </Text>
                <Text
                  style={{
                    color: "#252a31",
                    fontFamily: "TT Commons Regular",
                    fontSize: width * 0.037,
                    marginTop: "1%",
                  }}
                >
                  Lihat rencana dan inisiatif komprehensif{"\n"}
                  yang ditawarkan oleh kandidat untuk{"\n"}
                  mencapai tujuan mereka
                </Text>
              </View>
              <Image
                source={require("../assets/images/IconRight.png")}
                style={{ width: "5%", height: "20%", left: "40%" }}
              />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.chart_wrapper}>
          <Text
            style={{
              color: "#252a31",
              fontFamily: "CircularStd-Bold",
              fontSize: width * 0.04,
              fontWeight: "bold",
              marginBottom: "1%",
              lineHeight: 25,
            }}
          >
            Rekapitulasi Pemilihan Kepala Desa
          </Text>
          <Text
            style={{
              color: "#252a31",
              fontFamily: "CircularStd-Book",
              fontSize: width * 0.03,
              marginBottom: "5%",
            }}
          >
            Desa Sejahtera 2024
          </Text>
          {votingRun && (
            <Text
              style={{
                color: "#252a31",
                fontFamily: "CircularStd-Book",
                fontSize: width * 0.03,
                marginBottom: "5%",
              }}
            >
              Rekapitulasi Suara Muncul Ketika Pemilihan Sudah Selesai
            </Text>
          )}
          <View style={styles.chartBackground}>
            <BarChart
              data={barData}
              width={width * 0.6}
              height={height * 0.2}
              yAxisExtraHeight={height * 0.02}
              barWidth={40}
              spacing={25}
              noOfSections={5}
              yAxisThickness={0}
              xAxisThickness={0}
              rulesType="solid"
              barBorderTopLeftRadius={10}
              barBorderTopRightRadius={10}
            />
          </View>
        </View>

        <View style={styles.vote_bt_wrapper}>
          <TouchableOpacity
            style={styles.vote_bt}
            onPress={handleVoteButtonPress}
          >
            <Image
              source={require("../assets/images/PaperPlaneTilt.png")}
              style={{ width: "5%", height: "70%", marginLeft: "-5%" }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "CircularStd-Medium",
                marginLeft: "5%",
              }}
            >
              Tentukan pilihanmu sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalOverlay} />
          <View style={styles.modalView}>
            <Image
              source={require("../assets/images/Improve.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>
              Simak tata cara voting di bawah ini
            </Text>
            <View style={styles.container}>
              <Text style={styles.headerText}>
                Untuk memberikan suara, pastikan hal-hal berikut:
              </Text>
              <Text style={styles.bulletPointText}>
                1. Ponsel Anda memiliki fitur NFC aktif.
              </Text>
              <Text style={styles.bodyText}>
                NFC (Near Field Communication) adalah teknologi yang
                memungkinkan ponsel Anda membaca KTP elektronik dengan mudah.
                Pastikan fitur ini aktif di pengaturan ponsel Anda.
              </Text>
              <Text style={styles.bulletPointText}>
                2. Siapkan KTP elektronik Anda.
              </Text>
              <Text style={styles.bodyText}>
                KTP Elektronik Anda akan digunakan untuk verifikasi identitas.
                Pastikan KTP dalam kondisi baik dan dapat dibaca oleh ponsel.
              </Text>
              <Text style={styles.footerText}>
                Jika kedua syarat di atas sudah terpenuhi, Anda dapat
                melanjutkan proses voting dengan menekan tombol "Lanjutkan"
              </Text>
            </View>
            <TouchableHighlight
              style={styles.modalButton}
              underlayColor="#00d3b7"
              onPress={() => {
                handleModalClose();
                router.push("vote");
              }}
            >
              <Text style={styles.modalButtonText}>Lanjutkan</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "#00A58E",
    padding: "5%",
    paddingTop: "15%",
    height: "30%",
  },
  title: {
    color: "white",
    fontSize: width * 0.06,
    fontFamily: "CircularStd-Black",
    fontWeight: "900",
  },
  subtitle: {
    color: "white",
    fontSize: width * 0.03,
    marginTop: "1%",
    fontFamily: "CircularStd-Book",
  },
  search_bt: {
    backgroundColor: "#f5f5f5",
    marginTop: "10%",
    padding: "3%",
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  profil_bt: {
    backgroundColor: "#fff",
    paddingHorizontal: "3%",
    width: "100%",
    height: height * 0.12,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    top: "120%",
  },
  chart_wrapper: {
    backgroundColor: "#fff",
    padding: "5%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "20%",
  },
  chartBackground: {
    backgroundColor: "#ecf8f7",
    borderRadius: 5,
    padding: "3%",
  },
  vote_bt_wrapper: {
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: "30%",
    marginBottom: "20%",
  },
  vote_bt: {
    backgroundColor: "#00A58E",
    padding: "3%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: width * 0.0375,
    fontFamily: "CircularStd-Book",
    color: "#344054",
    marginBottom: "5%",
  },
  bulletPointText: {
    fontSize: width * 0.0375,
    fontFamily: "CircularStd-Bold",
    color: "#344054",
    marginBottom: "2%",
  },
  bodyText: {
    fontSize: width * 0.0375,
    textAlign: "justify",
    fontFamily: "CircularStd-Book",
    color: "#344054",
    marginLeft: "6.25%",
    marginBottom: "5%",
  },
  footerText: {
    fontSize: width * 0.0375,
    marginTop: "2.5%",
    textAlign: "justify",
    fontFamily: "CircularStd-Bold",
    color: "#344054",
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
    width: "85%",
    height: "auto",
  },
  modalImage: {
    width: 277,
    height: 146,
    marginBottom: "10%",
  },
  modalSubImage: {
    width: 325,
    height: 205,
    marginBottom: "10%",
    marginLeft: "2%",
  },
  modalText: {
    fontFamily: "CircularStd-Medium",
    fontSize: width * 0.04,
    color: "#000",
    marginBottom: "7.5%",
  },
  modalSubText: {
    fontFamily: "CircularStd-Book",
    fontSize: width * 0.034,
    color: "#344054",
    marginBottom: "10%",
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: "#00a58e",
    borderRadius: 10,
    padding: "4%",
    width: "100%",
    alignItems: "center",
    marginTop: "7.5%",
  },
  modalButtonText: {
    fontFamily: "CircularStd-Medium",
    color: "#fff",
    fontSize: width * 0.035,
  },
});

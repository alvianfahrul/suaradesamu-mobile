import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { BarChart } from "react-native-gifted-charts";
import { Link, router } from "expo-router";
import axios from "axios";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [totalSuaraMasuk, setTotalSuaraMasuk] = useState(0);
  const [formattedData, setFormattedData] = useState<
    { label: string; value: number }[]
  >([]);

  const [fontsLoaded] = useFonts({
    "CircularStd-Black": require("../assets/fonts/CircularStd-Black.ttf"),
    "CircularStd-Book": require("../assets/fonts/CircularStd-Book.ttf"),
    "CircularStd-Bold": require("../assets/fonts/CircularStd-Bold.ttf"),
    "CircularStd-Medium": require("../assets/fonts/CircularStd-Medium.ttf"),
    "TT Commons Regular": require("../assets/fonts/TT Commons Regular.otf"),
  });

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.EXPO_PUBLIC_API_URL + "/voting/real-count"
        );
        const { candidateVotesCount, totalSuaraMasuk } = response.data.data;

        const formattedData = candidateVotesCount.map(
          (item: { voteCount: any; name: any }) => ({
            value: item.voteCount,
            label: item.name,
          })
        );

        setTotalSuaraMasuk(totalSuaraMasuk);
        setFormattedData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); */

  /* if (formattedData.length > 0) {
    console.log(formattedData[0].label);
    console.log(formattedData[0].value);
  } */

  if (!fontsLoaded) {
    return null;
  }

  const barData = [
    {
      value: 34,
      label: "TEST",
      frontColor: "#cedeea",
      topLabelComponent: () => (
        <Text
          style={{
            color: "#2f3f57",
            fontSize: 14,
            fontFamily: "CircularStd-Medium",
            marginBottom: "10%",
          }}
        >
          34%
        </Text>
      ),
    },
    {
      value: 50,
      label: "TEST",
      frontColor: "#b7deda",
      topLabelComponent: () => (
        <Text
          style={{
            color: "#2f3f57",
            fontSize: 14,
            fontFamily: "CircularStd-Medium",
            marginBottom: "10%",
          }}
        >
          50%
        </Text>
      ),
    },
    {
      value: 16,
      label: "TEST",
      frontColor: "#f58686",
      topLabelComponent: () => (
        <Text
          style={{
            color: "#2f3f57",
            fontSize: 14,
            fontFamily: "CircularStd-Medium",
            marginBottom: "10%",
          }}
        >
          16%
        </Text>
      ),
    },
    {
      value: 65,
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
          65%
        </Text>
      ),
    },
  ];

  return (
    <View style={styles.container}>
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

      {/* Tambahkan BarChart dalam kotak yang mirip dengan profil_bt */}
      <View style={styles.chart_wrapper}>
        <Text
          style={{
            color: "#252a31",
            fontFamily: "CircularStd-Bold",
            fontSize: width * 0.04,
            fontWeight: "bold",
            marginBottom: "1%",
          }}
        >
          Real Count Calon Kepala Desa
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
        <View style={styles.chartBackground}>
          <BarChart
            data={barData}
            width={width * 0.6}
            height={170}
            barWidth={40}
            spacing={25}
            noOfSections={5}
            yAxisThickness={0}
            xAxisThickness={0}
            maxValue={100}
            rulesType="solid"
            barBorderTopLeftRadius={10}
            barBorderTopRightRadius={10}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.vote_bt}
        onPress={() => setModalVisible(true)}
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

      <Modal
        animationType="slide"
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
              source={require("../assets/images/Improve.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>
              Simak tata cara voting di bawah ini
            </Text>
            <Image
              source={require("../assets/images/vote-rules.png")}
              style={styles.modalSubImage}
            />
            <TouchableHighlight
              style={styles.modalButton}
              underlayColor="#00d3b7"
              onPress={() => {
                setModalVisible(false);
                router.push("vote");
              }}
            >
              <Text style={styles.modalButtonText}>Lanjutkan</Text>
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#00A58E",
    height: "30%",
    padding: "5%",
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
    marginTop: "5%",
    paddingHorizontal: "3%",
    width: "100%",
    height: height * 0.12,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
  },
  chart_wrapper: {
    backgroundColor: "#fff",
    marginTop: "15%",
    padding: "5%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  chartBackground: {
    backgroundColor: "#ecf8f7",
    borderRadius: 5,
    padding: "3%",
  },
  vote_bt: {
    backgroundColor: "#00A58E",
    padding: "3%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "3%",
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
    marginBottom: "10%",
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
  },
  modalButtonText: {
    fontFamily: "CircularStd-Medium",
    color: "#fff",
    fontSize: width * 0.035,
  },
});

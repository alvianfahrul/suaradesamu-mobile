import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, router } from "expo-router";

export default function Yusuf() {
  const [selectedSwitch, setSelectedSwitch] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    "CircularStd-Black": require("../assets/fonts/CircularStd-Black.ttf"),
    "CircularStd-Book": require("../assets/fonts/CircularStd-Book.ttf"),
    "CircularStd-Bold": require("../assets/fonts/CircularStd-Bold.ttf"),
    "CircularStd-Medium": require("../assets/fonts/CircularStd-Medium.ttf"),
    "TT Commons Regular": require("../assets/fonts/TT Commons Regular.otf"),
    "TT Commons DemiBold": require("../assets/fonts/TT Commons DemiBold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: "20%" }}>
        <View style={styles.container}>
          <View style={styles.id_card}>
            <Image
              source={require("../assets/images/foto_yusuf.png")}
              style={styles.image}
            />
            <Text style={styles.nama}>Yusuf Bahrudin, S.H</Text>
            <Text style={styles.jabatan}>
              Kepala Divisi Hukum, Desa Sejahtera
            </Text>
            <Text style={styles.tahun}>48 Tahun</Text>
            <View style={styles.calon_view}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "TT Commons DemiBold",
                  fontWeight: "bold",
                  fontSize: width * 0.032,
                }}
              >
                Calon Nomor 2
              </Text>
            </View>
          </View>

          <View style={styles.switch_card}>
            <TouchableOpacity
              style={[
                styles.switch_bt,
                {
                  alignSelf: "flex-start",
                  width: "417%",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  backgroundColor: selectedSwitch == 0 ? "#d4e9e7" : "white",
                  borderColor: selectedSwitch == 0 ? "#00a58e" : "transparent",
                  borderRadius: selectedSwitch == 0 ? 10 : 0,
                },
              ]}
              onPress={() => {
                setSelectedSwitch(0);
              }}
            >
              <Text
                style={{
                  fontFamily: "CircularStd-Book",
                  fontSize: width * 0.04,
                  color: "#252a31",
                }}
              >
                Profil
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switch_bt,
                {
                  alignSelf: "flex-end",
                  width: "167%",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  backgroundColor: selectedSwitch == 1 ? "#d4e9e7" : "white",
                  borderColor: selectedSwitch == 1 ? "#00a58e" : "transparent",
                  borderRadius: selectedSwitch == 1 ? 10 : 0,
                },
              ]}
              onPress={() => {
                setSelectedSwitch(1);
              }}
            >
              <Text
                style={{
                  fontFamily: "CircularStd-Book",
                  fontSize: width * 0.04,
                  color: "#252a31",
                }}
              >
                Program Kerja
              </Text>
            </TouchableOpacity>
          </View>

          {selectedSwitch == 0 ? (
            <View>
              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/Student.png")}
                  style={[styles.detai_image, { top: -45 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>Pendidikan</Text>
                  <Text style={styles.detail_title_2}>
                    • Universitas Gadjah Mada
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Magister Teknik Sipil (S.T) 2006 - 2009
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Institut Teknologi Sepuluh Nopember
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Sarjana Teknik Sipil (S.T) 1999 - 2003
                  </Text>
                </View>
              </View>

              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/PuzzlePiece.png")}
                  style={[styles.detai_image, { top: -85 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>Pengalaman Kerja</Text>
                  <Text style={styles.detail_title_2}>
                    • Kepala Seksi Pembangunan Infrastruktur
                  </Text>
                  <Text style={[styles.detail_title_2, { marginLeft: "6.5%" }]}>
                    Desa Pemerintah Desa Sejahtera
                  </Text>
                  <Text style={styles.detail_title_3}>2015 - Sekarang</Text>
                  <Text style={styles.detail_title_2}>
                    • Manajer Proyek PT. Bangun Jaya
                  </Text>
                  <Text style={[styles.detail_title_2, { marginLeft: "6.5%" }]}>
                    Kontruksi
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Surabaya 2010 - 2015
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Site Engineer PT. Maju Terus
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Surabaya 2010 - 2015
                  </Text>
                </View>
              </View>

              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/UsersFour.png")}
                  style={[styles.detai_image, { top: -50 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>Organisasi</Text>
                  <Text style={styles.detail_title_2}>
                    • Ketua Karang Taruna Desa Sejahtera
                  </Text>
                  <Text style={styles.detail_title_3}>2016 - Sekarang</Text>
                  <Text style={styles.detail_title_2}>
                    • Anggota Ikatan Alumni Teknik Sipil
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Institut Teknologi Sepuluh Nopember
                  </Text>
                  <Text style={styles.detail_title_3}>2003 - Sekarang</Text>
                </View>
              </View>

              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/Medal.png")}
                  style={[styles.detai_image, { top: -90 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>
                    Penghargaan dan Prestasi
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Penghargaan Desa Terbaik dalam
                  </Text>
                  <Text style={[styles.detail_title_2, { marginLeft: "6.6%" }]}>
                    Pengelolaan Infrastruktur
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Pemerintah Provinsi Jawa Timur, 2022
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Inovator Terbaik Dalam Pembangunan
                  </Text>
                  <Text style={[styles.detail_title_2, { marginLeft: "6.6%" }]}>
                    Desa
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Kementerian Desa, Pembangunan Daerah
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Tertinggal, dan Transmigrasi, 2020
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Juara 1 Lomba Desa Mandiri
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Kabupaten Maju, 2018
                  </Text>
                </View>
              </View>

              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/VideoConference.png")}
                  style={[styles.detai_image, { top: -65 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>
                    Pelatihan dan Seminar
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Seminar Nasional Pembangunan
                  </Text>
                  <Text style={[styles.detail_title_2, { marginLeft: "6.6%" }]}>
                    Berkelanjutan
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Universitas Indonesia, 2021
                  </Text>
                  <Text style={styles.detail_title_2}>
                    • Workshop Manajemen Risiko Proyek
                  </Text>
                  <Text style={[styles.detail_title_2, { marginLeft: "6.6%" }]}>
                    Kementerian
                  </Text>
                  <Text style={styles.detail_title_3}>
                    Pekerjaan Umum dan Perumahan Rakyat, 2019
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/Building.png")}
                  style={[styles.detai_image, { top: -60 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>
                    Program Infrastruktur Berkelanjutan
                  </Text>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Membangun dan memperbaiki jalan desa</Text>
                    <Text style={{ marginLeft: "3%" }}>
                      yang ramah lingkungan
                    </Text>
                  </View>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Mengoptimalkan sistem irigasi untuk</Text>
                    <Text style={{ marginLeft: "3%" }}>
                      meningkatkan hasil pertanian
                    </Text>
                  </View>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Membangun jembatan penghubung antar</Text>
                    <Text style={{ marginLeft: "3%" }}>
                      desa untuk mempermudah akses
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/ChartLineUp.png")}
                  style={[styles.detai_image, { top: -60 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>
                    Pemberdayaan Ekonomi Lokal
                  </Text>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Pelatihan keterampilan bagi pemuda dan</Text>
                    <Text style={{ marginLeft: "3%" }}>pemudi desa</Text>
                  </View>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Membuka pusat UMKM dan koperasi desa</Text>
                    <Text style={{ marginLeft: "3%" }}>
                      untuk meningkatkan ekonomi warga
                    </Text>
                  </View>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Program bantuan modal usaha bagi petani</Text>
                    <Text style={{ marginLeft: "3%" }}>
                      dan pengrajin lokal
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.detail_card, { height: "auto" }]}>
                <Image
                  source={require("../assets/images/Icon(1).png")}
                  style={[styles.detai_image, { top: -50 }]}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text style={styles.detail_title_1}>Desa Digital</Text>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Pembangunan pusat teknologi desa dengan</Text>
                    <Text style={{ marginLeft: "3%" }}>
                      akses internet gratis
                    </Text>
                  </View>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Pelatihan teknologi dan informasi untuk</Text>
                    <Text style={{ marginLeft: "3%" }}>masyarakat desa</Text>
                  </View>
                  <View style={[styles.detail_title_3, { marginLeft: "4%" }]}>
                    <Text>• Implementasi sistem administrasi desa</Text>
                    <Text style={{ marginLeft: "3%" }}>berbasis digital</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.vote_wrapper}>
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
    </GestureHandlerRootView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  id_card: {
    alignSelf: "center",
    backgroundColor: "#d4e9e7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: "15%",
    padding: "5%",
    width: "90%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#00a58e",
    position: "absolute",
    top: -50,
    left: 20,
  },
  nama: {
    fontSize: width * 0.041,
    fontFamily: "TT Commons DemiBold",
    marginTop: "11%",
    fontWeight: "bold",
  },
  jabatan: {
    fontSize: width * 0.037,
    fontFamily: "TT Commons Regular",
    marginTop: "1%",
  },
  tahun: {
    fontSize: width * 0.037,
    fontFamily: "TT Commons Regular",
    marginTop: "1%",
  },
  calon_view: {
    backgroundColor: "#344054",
    marginTop: "4%",
    padding: "2%",
    width: "40%",
    borderRadius: 5,
    alignItems: "center",
  },
  switch_card: {
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 50,
    marginTop: "5%",
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  switch_bt: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderWidth: 2,
    borderColor: "#00a58e",
  },
  detail_card: {
    backgroundColor: "#fff",
    width: "90%",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: "5%",
    padding: "5%",
    paddingHorizontal: "3%",
    alignSelf: "center",
    alignItems: "center",
  },
  detai_image: {
    width: 25,
    height: 25,
    marginLeft: "2%",
  },
  detail_title_1: {
    fontFamily: "CircularStd-Bold",
    fontSize: width * 0.04,
    marginBottom: "2%",
  },
  detail_title_2: {
    fontFamily: "TT Commons DemiBold",
    fontSize: width * 0.04,
    marginLeft: "3%",
  },
  detail_title_3: {
    fontFamily: "TT Commons Regular",
    fontSize: width * 0.035,
    marginLeft: "6.75%",
  },
  vote_wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f5f5f5",
    paddingVertical: "3%",
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

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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

export default function Profile() {
  const [selectedSwitch, setSelectedSwitch] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [credibilityModal, setCredibilityModal] = useState(false);
  interface ProfileData {
    id: number;
    name: string;
    age: number;
    noUrut: number;
    visi: string;
    photoProfileUrl: string;
    photoProfileAlt: string;
    credibility: number;
    createdAt: string;
    updatedAt: string;
    credibilityDetails: {
      date_from: string;
      date_to: string;
    };
    organization: {
      id: number;
      title: string;
      periodStart: string;
      periodEnd: string;
    }[];
    workExperience: {
      id: number;
      title: string;
      periodStart: string;
      periodEnd: string;
    }[];
    workPlan: {
      id: number;
      title: string;
      detail: string;
    }[];
    education: {
      id: number;
      degree: string;
      institution: string;
      periodStart: string;
      periodEnd: string;
    }[];
  }
  const [profiles, setProfiles] = useState<ProfileData | null>(null);
  const { profile } = useLocalSearchParams<{ profile: string }>();
  const [votingRun, setVotingRun] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + `/candidate/${profile}`
        );
        const data = await response.json();

        setProfiles(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_API_URL + "/voting/real-count"
      );
      const { isVotingRun } = response.data.data;

      setVotingRun(isVotingRun);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleCredibilityModal = () => {
    setCredibilityModal(false);
  };

  let credibilityResult = "";

  if (profiles?.credibility !== undefined) {
    const credibility = profiles.credibility;

    if (credibility >= 80) {
      credibilityResult = "Sangat Baik";
    } else if (credibility >= 60) {
      credibilityResult = "Baik";
    } else if (credibility >= 50) {
      credibilityResult = "Cukup";
    } else {
      credibilityResult = "Tidak Layak";
    }
  }

  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: "20%" }}
        >
          <View style={styles.container}>
            <View style={styles.id_card}>
              <Image
                source={{ uri: profiles?.photoProfileUrl }}
                style={styles.image}
              />
              <Text style={styles.nama}>{profiles?.name}</Text>
              <Text style={styles.jabatan}>{profiles?.visi}</Text>
              <Text style={styles.tahun}>{profiles?.age} Tahun</Text>
              <View style={styles.calon_view}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "TT Commons DemiBold",
                    fontWeight: "bold",
                    fontSize: width * 0.032,
                  }}
                >
                  Calon Nomor {profiles?.noUrut}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setCredibilityModal(true);
                }}
              >
                <View style={styles.credibility_wrapper}>
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "TT Commons DemiBold",
                      fontWeight: "bold",
                      fontSize: width * 0.032,
                    }}
                  >
                    Kredibilitas : {credibilityResult}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.switch_card}>
              <TouchableOpacity
                style={[
                  styles.switch_bt,
                  {
                    alignSelf: "flex-start",
                    width: "405%",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: selectedSwitch == 0 ? "#d4e9e7" : "white",
                    borderColor:
                      selectedSwitch == 0 ? "#00a58e" : "transparent",
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
                    width: "160%",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: selectedSwitch == 1 ? "#d4e9e7" : "white",
                    borderColor:
                      selectedSwitch == 1 ? "#00a58e" : "transparent",
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
                    source={require("../../assets/images/Student.png")}
                    style={[styles.detai_image]}
                  />
                  <View style={{ marginLeft: "5%", flexShrink: 1 }}>
                    <Text style={styles.detail_title_1}>Pendidikan</Text>
                    {Array.isArray(profiles?.education) &&
                    profiles.education.length > 0 ? (
                      profiles.education.map((edu, index) => (
                        <View key={index}>
                          <Text style={styles.detail_title_2}>
                            • {edu.institution}
                          </Text>
                          <Text style={styles.detail_title_3}>
                            {edu.degree}
                            {"\n"}
                            {edu.periodStart} - {edu.periodEnd}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.detail_title_2}>
                        No education information available
                      </Text>
                    )}
                  </View>
                </View>

                <View style={[styles.detail_card, { height: "auto" }]}>
                  <Image
                    source={require("../../assets/images/PuzzlePiece.png")}
                    style={[styles.detai_image]}
                  />
                  <View style={{ marginLeft: "5%", flexShrink: 1 }}>
                    <Text style={styles.detail_title_1}>Pengalaman Kerja</Text>
                    {Array.isArray(profiles?.workExperience) &&
                    profiles.workExperience.length > 0 ? (
                      profiles.workExperience.map((workExperience, index) => (
                        <View key={index}>
                          <Text style={styles.detail_title_2}>
                            • {workExperience.title}
                          </Text>
                          <Text style={styles.detail_title_3}>
                            {workExperience.periodStart} -{" "}
                            {workExperience.periodEnd}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.detail_title_2}>
                        No work experience available
                      </Text>
                    )}
                  </View>
                </View>

                <View style={[styles.detail_card, { height: "auto" }]}>
                  <Image
                    source={require("../../assets/images/UsersFour.png")}
                    style={[styles.detai_image]}
                  />
                  <View style={{ marginLeft: "5%", flexShrink: 1 }}>
                    <Text style={styles.detail_title_1}>Organisasi</Text>
                    {Array.isArray(profiles?.organization) &&
                    profiles.organization.length > 0 ? (
                      profiles.organization.map((organization, index) => (
                        <View key={index}>
                          <Text style={styles.detail_title_2}>
                            • {organization.title}
                          </Text>
                          <Text style={styles.detail_title_3}>
                            {organization.periodStart} -{" "}
                            {organization.periodEnd}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.detail_title_2}>
                        No organizations available
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={[styles.detail_card, { height: "auto" }]}>
                  <Image
                    source={require("../../assets/images/Building.png")}
                    style={[styles.detai_image]}
                  />
                  <View style={{ marginLeft: "5%", flexShrink: 1 }}>
                    {Array.isArray(profiles?.workPlan) &&
                    profiles.workPlan.length > 0 ? (
                      profiles.workPlan.map((workPlan, index) => (
                        <View key={index}>
                          <Text style={styles.detail_title_1}>
                            {workPlan.title}
                          </Text>
                          <Text
                            style={[
                              styles.detail_title_3,
                              { marginLeft: "2%" },
                            ]}
                          >
                            {workPlan.detail}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.detail_title_1}>
                        No work plans available
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.vote_wrapper}>
          <TouchableOpacity
            style={styles.vote_bt}
            onPress={handleVoteButtonPress}
          >
            <Image
              source={require("../../assets/images/PaperPlaneTilt.png")}
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
            onRequestClose={handleModalClose}
          >
            <View style={styles.modalWrapper}>
              <View style={styles.modalOverlay} />
              <View style={styles.modalView}>
                <Image
                  source={require("../../assets/images/Improve.png")}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>
                  Simak tata cara voting di bawah ini
                </Text>
                <Image
                  source={require("../../assets/images/vote-rules.png")}
                  style={styles.modalSubImage}
                />
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={credibilityModal}
            onRequestClose={handleCredibilityModal}
          >
            <View style={styles.modalWrapper}>
              <View style={styles.modalOverlay} />
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Data Kredibilitas</Text>
                <Text style={styles.modalSubText}>
                  Kredibilitas : Positif {profiles?.credibility} %
                </Text>
                <Text style={styles.modalSubText}>
                  Diambil dari komentar postingan Instagram kandidat yang
                  dposting pada tanggal
                </Text>
                <Text style={styles.modalSubText}>
                  {profiles?.credibilityDetails?.date_from}
                </Text>
                <Text style={styles.modalSubText}>Sampai dengan</Text>
                <Text style={styles.modalSubText}>
                  {profiles?.credibilityDetails?.date_to}
                </Text>
                <TouchableHighlight
                  style={styles.modalButton}
                  underlayColor="#00d3b7"
                  onPress={() => {
                    handleCredibilityModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>Tutup</Text>
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
    lineHeight: 20,
  },
  tahun: {
    fontSize: width * 0.037,
    fontFamily: "TT Commons Regular",
    marginTop: "1%",
  },
  credibility_wrapper: {
    backgroundColor: "#00a58e",
    borderRadius: 5,
    alignItems: "center",
    padding: "2%",
    marginTop: "5%",
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
    height: 45,
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
  },
  detai_image: {
    width: 25,
    height: 25,
    marginLeft: "2%",
  },
  detail_title_1: {
    fontFamily: "CircularStd-Bold",
    fontSize: width * 0.04,
    marginBottom: "3%",
  },
  detail_title_2: {
    fontFamily: "TT Commons DemiBold",
    fontSize: width * 0.04,
    marginLeft: "2%",
  },
  detail_title_3: {
    fontFamily: "TT Commons Regular",
    fontSize: width * 0.035,
    marginLeft: "7.5%",
    lineHeight: 20,
    marginBottom: "3%",
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
    marginBottom: "8%",
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

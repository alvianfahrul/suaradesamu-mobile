import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
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
    photoProfileUrl: string;
    photoProfileAlt: string;
    createdAt: string;
    updatedAt: string;
  }
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#00a58e" />;
  }

  return (
    <><StatusBar style="dark" /><ScrollView contentContainerStyle={{ paddingBottom: "5%" }}>
      <View style={styles.container}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.card}>
            <Image
              source={{ uri: profile.photoProfileUrl }}
              style={styles.image} />
            <Text style={styles.nama}>{profile.name}</Text>
            <Text style={styles.tahun}>{profile.age} tahun</Text>
            <Link href={`profile/${profile.id}`} asChild>
              <TouchableOpacity style={styles.lihat_bt}>
                <Text
                  style={{ color: "#007f6d", fontFamily: "CircularStd-Medium" }}
                >
                  Lihat selengkapnya
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView></>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4e9e7",
    marginTop: "5%",
    padding: "5%",
    width: "90%",
  },
  image: {
    width: 82,
    height: 82,
    backgroundColor: "#00a58e",
    borderRadius: 50,
  },
  nama: {
    fontSize: width * 0.05,
    fontFamily: "TT Commons DemiBold",
    marginTop: "5%",
  },
  tahun: {
    fontSize: width * 0.04,
    fontFamily: "TT Commons Regular",
  },
  lihat_bt: {
    backgroundColor: "#ecf8f7",
    marginTop: "5%",
    padding: "4%",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
});

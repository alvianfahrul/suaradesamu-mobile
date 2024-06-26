import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

export default function index() {
  const [fontsLoaded] = useFonts({
    'CircularStd-Black': require('../../assets/fonts/CircularStd-Black.ttf'),
    'CircularStd-Book': require('../../assets/fonts/CircularStd-Book.ttf'),
    'CircularStd-Bold': require('../../assets/fonts/CircularStd-Bold.ttf'),
    'CircularStd-Medium': require('../../assets/fonts/CircularStd-Medium.ttf'),
    'TT Commons Regular': require('../../assets/fonts/TT Commons Regular.otf'),
    'TT Commons DemiBold': require('../../assets/fonts/TT Commons DemiBold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: "5%" }}>
      <View style={styles.container}>

        <View style={styles.card}>
          <Image source={require('../../assets/images/foto_jefri.png')} style={styles.image} />
          <Text style={styles.nama}>Jefri Kurniawan, S.T., M.T.</Text>
          <Text style={styles.tahun}>42 tahun</Text>
          <Link href='profile/1' asChild>
            <TouchableOpacity style={styles.lihat_bt}>
              <Text style={{ color: '#007f6d', fontFamily: 'CircularStd-Medium' }}>
                Lihat selengkapnya
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/foto_yusuf.png')} style={styles.image} />
          <Text style={styles.nama}>Yusuf Bahrudin, S.H.</Text>
          <Text style={styles.tahun}>48 tahun</Text>
          <Link href='profile/2' asChild>
            <TouchableOpacity style={styles.lihat_bt}>
              <Text style={{ color: '#007f6d', fontFamily: 'CircularStd-Medium' }}>
                Lihat selengkapnya
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/foto_agus.png')} style={styles.image} />
          <Text style={styles.nama}>Agus Darma Susilo, S.E.</Text>
          <Text style={styles.tahun}>49 Tahun</Text>
          <Link href='profile/3' asChild>
            <TouchableOpacity style={styles.lihat_bt}>
              <Text style={{ color: '#007f6d', fontFamily: 'CircularStd-Medium' }}>
                Lihat selengkapnya
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4e9e7',
    marginTop: '5%',
    padding: '5%',
    width: '90%',
  },
  image: {
    width: 82,
    height: 82,
    backgroundColor: '#00a58e',
    borderRadius: 50
  },
  nama: {
    fontSize: width * 0.05,
    fontFamily: 'TT Commons DemiBold',
    marginTop: '5%'
  },
  tahun: {
    fontSize: width * 0.04,
    fontFamily: 'TT Commons Regular',
  },
  lihat_bt: {
    backgroundColor: '#ecf8f7',
    marginTop: '5%',
    padding: '4%',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  }
});

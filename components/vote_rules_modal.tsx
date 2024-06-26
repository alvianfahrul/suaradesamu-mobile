// components/ModalComponent.js

import React from 'react';
import { Modal, View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  secondModalVisible,
  setSecondModalVisible,
  setIsCloseButtonPressed,
  handleModalClose,
  handleModalConfirm,
}) => {
  return (
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
            Sebelum mengirimkan suara Anda, pastikan bahwa informasi data diri dan calon pilihan Anda sudah sesuai
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
              setSecondModalVisible(true);
              setModalVisible(false)
            }}
          >
            <Text style={styles.modalButtonText}>Kirim suara</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

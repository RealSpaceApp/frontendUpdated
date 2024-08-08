import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './ModalStyles';
import Search from '../../../../assets/events/Search';
import { SvgXml } from 'react-native-svg';

const TimezoneModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalTitleContainer}>

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Location</Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.selectButton}
                  onPress={onClose}>
                  <Text style={styles.textSelect}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.textAdd}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.searchBar}>
              <SvgXml xml={Search} />
              <TextInput
              placeholderTextColor="#3C3C434D"
                placeholder="Search"
              />
            </View>
            <Text style={styles.subtitle}>SEARCH FOR A LOCATION</Text>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default TimezoneModal;
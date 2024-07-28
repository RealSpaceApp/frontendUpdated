import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './ModalStyles';

const VisibilityModal = ({ visible, onClose }) => {
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

                    {/* <Text style={styles.modalTitle}>Location</Text> */}
                    {/* <TouchableOpacity onPress={closeLocationModal}>
                      <SvgXml xml={CloseButton} />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </Modal>
  );
};

export default VisibilityModal;
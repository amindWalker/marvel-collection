import React, { Component } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
export default class AppDescription extends Component {
  state = {
    isModalVisible: true
  };
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button color='rgb(224, 48, 48)' title="Info"  onPress={this.toggleModal} />
        <Modal style={styles.modalStyle} isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
        <Image style={styles.modalImage} source={require("../assets/marvelchars_bg.jpg")}/>

            <Button color='rgb(224, 48, 48)' title="Close" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalImage:{
    flex: 1,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    opacity: 1,
    alignSelf: "center",
  },
  modalStyle:{
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: "center",
  },
}
)
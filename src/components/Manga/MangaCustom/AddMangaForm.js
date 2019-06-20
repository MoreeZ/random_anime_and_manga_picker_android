import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import Reinput from "reinput";
import { Form, Button, Text } from "native-base";
import { connect } from "react-redux";
import { addLocalManga } from "../../../actions/$localActions";

class AddMangaForm extends Component {
  state = { mangaTitle: "" };
  handleSubmit = () => {
    Keyboard.dismiss();
    const alreadyExists = this.props.currentMangaList.list.find(
      each => each === this.state.mangaTitle
    );
    if (
      this.state.mangaTitle &&
      this.state.mangaTitle !== "" &&
      !alreadyExists
    ) {
      this.props.addManga(this.state.mangaTitle);
      this.setState({
        ...this.state,
        mangaTitle: ""
      });
    }
  };

  handleChange = text => {
    this.setState({
      ...this.state,
      mangaTitle: text
    });
  };

  render() {
    return (
      <View style={styles.usernameform}>
        <Form style={styles.form}>
          <Reinput
            label="Enter Manga Title"
            underlineActiveColor="#009EE1"
            activeColor="#009EE1"
            value={this.state.mangaTitle}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSubmit}
          />
          <Button
            style={styles.button}
            name="submitButton"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttontext}> ADD MANGA </Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMangaList: state.mangaCustomReducer.currentMangaList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addManga: manga => {
      dispatch(addLocalManga(manga));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMangaForm);

const styles = StyleSheet.create({
  usernameform: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: 300,
    marginBottom: 10
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#009EE1",
    height: 34
  },
  buttontext: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "normal"
  },
  input: {
    textAlign: "center"
  }
});

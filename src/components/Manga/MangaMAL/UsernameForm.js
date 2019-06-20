import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import Reinput from "reinput";
import { Form, Button, Text } from "native-base";
import { connect } from "react-redux";
import { fetchUserMangaList } from "../../../actions/$malActions";
import { fetchUserAnimeList } from "../../../actions/malActions";

class UsernameForm extends Component {
  state = {};
  handleSubmit = () => {
    Keyboard.dismiss();
    if (this.state.username && this.state.username !== "") {
      this.props.$updateUsername(this.state.username);
      this.props.updateUsername(this.state.username);
      this.setState({
        ...this.state,
        username: ""
      });
    }
  };
  handleChange = text => {
    this.setState({
      ...this.state,
      username: text
    });
  };
  render() {
    return (
      <View style={styles.usernameform}>
        <Form style={styles.form}>
          <Reinput
            label="Your Username"
            underlineActiveColor="#009EE1"
            activeColor="#009EE1"
            value={this.state.username}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSubmit}
            error={this.props.error ? "Invalid Username" : ""}
          />
          <Button
            style={styles.button}
            name="submitButton"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttontext}> SEARCH USERNAME </Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    $updateUsername: username => {
      dispatch(fetchUserMangaList(username));
    },
    updateUsername: username => {
      dispatch(fetchUserAnimeList(username));
    }
  };
};

const mapStateToProps = state => {
  return {
    error: state.mangaMalReducer.displayOption.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameForm);

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
    height: 34,
    marginBottom: 5
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

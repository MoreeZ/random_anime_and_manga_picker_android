import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Form, Picker, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";
import {
  importMangaList,
  createMangaList
} from "../../../actions/$localActions";
import Reinput from "reinput";

class ImportList extends Component {
  state = { listType: "plan_to_read" };
  handleRemoveManga = manga => {
    this.props.removeManga(manga, this.props.currentMangaList);
  };
  onValueChange = value => {
    this.setState({
      ...this.state,
      listType: value
    });
  };
  handleChange = (name, text) => {
    this.setState({
      ...this.state,
      [name]: text
    });
  };
  handleSubmitNew = () => {
    if (this.state.listName && this.state.listName !== "") {
      this.props.createList(this.state.listName);
      this.props.closeMangaList();
    }
  };
  handleSubmitImport = () => {
    if (
      this.state.listName2 &&
      this.state.username &&
      this.state.listType &&
      this.state.listName2 !== "" &&
      this.state.listType !== "" &&
      this.state.username !== "" &&
      !this.props.loadingStatus.loading
    ) {
      this.props.importManga(
        this.state.username,
        this.state.listName2,
        this.state.listType
      );
      // this.props.closeMangaList();
    }
  };
  render() {
    const { currentMangaList } = this.props;
    return (
      <ScrollView style={styles.mainContainer}>
        <Card style={{ marginTop: 20 }}>
          <CardItem header>
            <Text
            // style={styles.headertext}
            >
              ADD A NEW LIST
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Form style={styles.form}>
                <Reinput
                  label="New List Name"
                  underlineActiveColor="#009EE1" // #FF4081
                  activeColor="#009EE1"
                  value={this.state.mangaTitle}
                  onChangeText={text => this.handleChange("listName", text)}
                  onSubmitEditing={this.handleSubmitNew}
                  style={{ height: 30 }}
                />
                <View style={{ width: "100%" }}>
                  <Button
                    style={styles.button}
                    name="submitButton"
                    onPress={this.handleSubmitNew}
                  >
                    <Text style={styles.buttontext}> CREATE NEW LIST </Text>
                  </Button>
                </View>
              </Form>
            </Body>
          </CardItem>
        </Card>
        <View style={styles.divider} />
        <Card>
          <CardItem header style={{ height: 0, marginTop: 9 }}>
            <Text
            // style={styles.headertext}
            >
              IMPORT A LIST FROM MYANIMELIST
            </Text>
          </CardItem>
          <CardItem>
            <Form style={styles.form}>
              <Reinput
                label="MyAnimeList Username"
                underlineActiveColor="#009EE1"
                activeColor="#009EE1"
                value={this.state.username}
                onChangeText={text => this.handleChange("username", text)}
                // onSubmitEditing={this.handleSubmit}
                style={{ height: 46 }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                blurOnSubmit={false}
                error={this.props.loadingStatus.error ? "Invalid Username" : ""}
              />
              <Reinput
                ref={input => {
                  this.secondTextInput = input;
                }}
                label="New List Name"
                underlineActiveColor="#009EE1"
                activeColor="#009EE1"
                value={this.state.mangaTitle}
                onChangeText={text => this.handleChange("listName2", text)}
                onSubmitEditing={this.handleSubmitImport}
                style={{ height: 70 }}
              />
              <Picker
                mode="dropdown"
                // iosHeader="Select your SIM"
                // iosIcon={<Icon name="arrow-down" />}
                style={{ width: 206, marginTop: 10, height: 40 }}
                selectedValue={this.state.listType}
                onValueChange={this.onValueChange}
              >
                <Picker.Item label="Plan To Read" value={"plan_to_read"} />
                <Picker.Item label="Completed" value={"completed"} />
                <Picker.Item label="On Hold" value={"on_hold"} />
                <Picker.Item label="Currently Reading" value={"reading"} />
                <Picker.Item label="Dropped" value={"dropped"} />
              </Picker>
              <View style={{ width: "100%" }}>
                <Button
                  style={styles.button}
                  name="submitButton"
                  onPress={this.handleSubmitImport}
                >
                  <Text style={styles.buttontext}> CREATE NEW LIST </Text>
                </Button>
              </View>
            </Form>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMangaList: state.mangaCustomReducer.currentMangaList,
    loadingStatus: state.mangaCustomReducer.loadingStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    importManga: (username, listName, listType) => {
      dispatch(importMangaList(username, listName, listType));
    },
    closeMangaList: () => {
      dispatch({ type: "$CLOSE_MANGALIST" });
    },
    createList: listName => {
      dispatch(createMangaList(listName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportList);

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20
  },
  form: {
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#FF4081",
    height: 40,
    marginTop: 30
  },
  buttontext: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "normal",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    textAlign: "center"
  },
  headertext: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: "grey"
    // marginTop: 30
  },
  divider: {
    height: 1,
    backgroundColor: "#BABABA",
    width: "100%",
    marginTop: 17,
    marginBottom: 17
  }
});

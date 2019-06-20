import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Tab,
  Tabs
} from "native-base";
import MangaMAL from "./MangaMAL/MangaMAL";
import MangaCustom from "./MangaCustom/MangaCustom";

class Manga extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Header style={styles.header} hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={styles.body}>
            <Title style={styles.title}>MANGA PICKER</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Tabs
            tabBarUnderlineStyle={{
              backgroundColor: "#00B2FF"
            }}
            // locked
          >
            <Tab
              heading="MyAnimeList"
              tabStyle={{ backgroundColor: "#FF4081" }}
              activeTabStyle={{ backgroundColor: "#FF4081" }}
              textStyle={{ fontFamily: "Roboto-Regular", color: "white" }}
              activeTextStyle={{ fontFamily: "Roboto-Regular", color: "white" }}
              style={{
                minHeight: Dimensions.get("window").height - 130
              }}
            >
              <MangaMAL />
            </Tab>
            <Tab
              heading="Custom"
              tabStyle={{ backgroundColor: "#FF4081" }}
              activeTabStyle={{ backgroundColor: "#FF4081" }}
              textStyle={{ fontFamily: "Roboto-Regular", color: "white" }}
              activeTextStyle={{ fontFamily: "Roboto-Regular", color: "white" }}
            >
              <MangaCustom />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

export default Manga;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF4081"
  },
  title: {
    fontSize: 20,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: -1,
    fontFamily: "Roboto-Medium"
  },
  body: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 14
  }
});

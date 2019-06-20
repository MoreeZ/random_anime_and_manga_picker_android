import React from "react";
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
import AnimeMAL from "./AnimeMAL/AnimeMAL";
import AnimeCustom from "./AnimeCustom/AnimeCustom";

class Anime extends React.Component {
  render() {
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={styles.body}>
            <Title style={styles.title}>ANIME PICKER</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Tabs
            tabBarUnderlineStyle={{
              backgroundColor: "#FF4081"
            }}
            // locked
          >
            <Tab
              heading="MyAnimeList"
              tabStyle={{ backgroundColor: "#009EE1" }}
              activeTabStyle={{ backgroundColor: "#009EE1" }}
              textStyle={{ fontFamily: "Roboto-Regular" }}
              activeTextStyle={{ fontFamily: "Roboto-Regular" }}
              style={{
                minHeight: Dimensions.get("window").height - 130
              }}
            >
              <AnimeMAL />
            </Tab>
            <Tab
              heading="Custom"
              tabStyle={{ backgroundColor: "#009EE1" }}
              activeTabStyle={{ backgroundColor: "#009EE1" }}
              textStyle={{ fontFamily: "Roboto-Regular" }}
              activeTextStyle={{ fontFamily: "Roboto-Regular" }}
            >
              <AnimeCustom />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
export default Anime;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#009EE1"
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

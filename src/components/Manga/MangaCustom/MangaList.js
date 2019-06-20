import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions
} from "react-native";
import { Icon, Container, Header, Tab, Tabs, Right } from "native-base";
import { connect } from "react-redux";
import EditList from "./EditList/EditList";
import ImportList from "./ImportList";
import YourLists from "./YourLists";

class MangaList extends Component {
  state = {};
  handleCloseMangaList = () => {
    this.props.closeMangaList();
  };

  render() {
    const { allLocalManga } = this.props;
    return (
      <Modal
        animationType="none"
        transparent
        visible={this.props.openMangaList}
      >
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
            onPress={this.handleCloseMangaList}
          />
          <View
            style={{
              marginTop: 22,
              position: "absolute",
              bottom: 0,
              height: 375,
              width: "100%",
              backgroundColor: "white"
            }}
          >
            <Container>
              <Header hasTabs style={{ backgroundColor: "white" }}>
                <Right>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                      marginTop: 3
                    }}
                    onPress={this.handleCloseMangaList}
                  >
                    {Dimensions.get("window").width >= 400 && (
                      <Text style={styles.detailtext}>MANGA LIST</Text>
                    )}
                    <Icon
                      type="Ionicons"
                      name="arrow-dropdown"
                      style={{ color: "#009EE1", paddingTop: 1 }}
                    />
                  </TouchableOpacity>
                </Right>
              </Header>
              {/* <Content> */}
              <Tabs
                tabBarUnderlineStyle={{
                  backgroundColor: "#444444"
                }}
                tabContainerStyle={{ height: 40 }}
              >
                <Tab
                  heading="EDIT LIST"
                  tabStyle={{ backgroundColor: "white" }}
                  activeTabStyle={{ backgroundColor: "white" }}
                  textStyle={{
                    fontFamily: "Roboto-Regular",
                    color: "#444444"
                  }}
                  activeTextStyle={{
                    fontFamily: "Roboto-Regular",
                    color: "#444444"
                  }}
                >
                  <ScrollView>
                    <EditList />
                  </ScrollView>
                </Tab>
                <Tab
                  heading="YOUR LISTS"
                  tabStyle={{ backgroundColor: "white" }}
                  activeTabStyle={{ backgroundColor: "white" }}
                  textStyle={{
                    fontFamily: "Roboto-Regular",
                    color: "#444444"
                  }}
                  activeTextStyle={{
                    fontFamily: "Roboto-Regular",
                    color: "#444444"
                  }}
                >
                  <ScrollView>
                    <YourLists />
                  </ScrollView>
                </Tab>
                <Tab
                  heading="ADD NEW"
                  tabStyle={{ backgroundColor: "white" }}
                  activeTabStyle={{ backgroundColor: "white" }}
                  textStyle={{
                    fontFamily: "Roboto-Regular",
                    color: "#444444"
                  }}
                  activeTextStyle={{
                    fontFamily: "Roboto-Regular",
                    color: "#444444"
                  }}
                >
                  <ScrollView>
                    <ImportList />
                  </ScrollView>
                </Tab>
              </Tabs>
              {/* </Content> */}
            </Container>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  detailtext: {
    color: "#009EE1",
    padding: 0,
    margin: 0,
    paddingRight: 9,
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  },
  viewatmal: {
    position: "absolute",
    left: 20,
    top: 20
  },
  viewatmalTEXT: {
    fontSize: 16,
    fontFamily: "Roboto-LIGHT",
    color: "#009EE1"
  },
  header: {
    height: 60,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight: 20
  },
  eachtext: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    color: "#444444"
  },
  headertext: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "gray"
  },
  eachtextContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%"
  },
  eachInfo: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    color: "#444444",
    flex: 1,
    flexWrap: "wrap"
  },
  listcontainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  divider: {
    height: 1,
    backgroundColor: "#BABABA",
    width: "100%",
    marginTop: 17,
    marginBottom: 17
  },
  eachradio: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    openMangaList: state.mangaCustomReducer.openMangaList,
    allLocalManga: state.mangaCustomReducer.allLocalManga
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMangaList: () => {
      dispatch({ type: "$CLOSE_MANGALIST" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangaList);

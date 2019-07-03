import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Clipboard
} from "react-native";
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
  Text,
  Radio
} from "native-base";
import { connect } from "react-redux";

class SideDrawer extends Component {
  render() {
    const { drawerColor } = this.props;
    return (
      <Container styles={{ zIndex: 10 }}>
        <Header style={{ ...styles.header, backgroundColor: drawerColor }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
              style={styles.button}
            >
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body style={styles.body}>
            <Title style={styles.title}>OPTIONS</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <ScrollView>
            <View style={styles.listcontainer}>
              <Text style={styles.headertext}>RANDOMIZER MODE</Text>
              <TouchableOpacity
                style={styles.eachradio}
                onPress={() => {
                  this.props.navigation.navigate("Anime Picker");
                  this.props.setDrawerColor("#009EE1");
                }}
              >
                <Text style={styles.eachtext}>Anime</Text>

                <Radio
                  color={"#444444"}
                  selectedColor={"#009EE1"}
                  style={{ paddingTop: 4 }}
                  selected={drawerColor === "#009EE1"}
                  onPress={() => {
                    this.props.navigation.navigate("Anime Picker");
                    this.props.setDrawerColor("#009EE1");
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eachradio}
                onPress={() => {
                  this.props.navigation.navigate("Manga Picker");
                  this.props.setDrawerColor("#FF4081");
                }}
              >
                <Text style={styles.eachtext}>Manga</Text>

                <Radio
                  color={"#444444"}
                  selectedColor={"#FF4081"}
                  style={{ paddingTop: 4 }}
                  selected={drawerColor === "#FF4081"}
                  onPress={() => {
                    this.props.navigation.navigate("Manga Picker");
                    this.props.setDrawerColor("#FF4081");
                  }}
                />
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>

            <View style={styles.listcontainer}>
              <Text style={styles.headertext}>GET IN TOUCH</Text>
              <TouchableOpacity
                style={styles.eachtextbutton}
                onPress={() =>
                  Linking.openURL(
                    "mailto:moreez@protonmail.com?subject=Business+-+Random+Anime/Manga+Picker+for+MyAnimeList&body=Hello.+I've+got+a+business+proposition+for+you..."
                  )
                }
              >
                <Icon style={styles.eachIcon} type="Entypo" name="mail" />
                <Text style={styles.eachtext}>Business Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eachtextbutton}
                onPress={() =>
                  Linking.openURL(
                    "mailto:moreez@protonmail.com?subject=Feedback+-+Random+Anime/Manga+Picker+for+MyAnimeList&body=Hey!+I've+got+some+feedback+for+your+app..."
                  )
                }
              >
                <Icon
                  style={styles.eachIcon}
                  type="MaterialIcons"
                  name="feedback"
                />
                <Text style={styles.eachtext}>Send Feedback</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>

            <View style={styles.listcontainer}>
              <Text style={styles.headertext}>SUPPORT THE DEVELOPER</Text>
              <TouchableOpacity
                style={styles.eachtextbutton}
                onPress={() => {
                  Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.randomanimepicker"
                  );
                }}
              >
                <Icon
                  style={{ ...styles.eachIcon, color: "#c9930c" }}
                  type="FontAwesome"
                  name="thumbs-up"
                />
                <Text style={{ ...styles.eachtext, color: "#c9930c" }}>
                  Rate our app
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eachtextbutton}
                onPress={() => {
                  Alert.alert(
                    "Share the App",
                    "https://play.google.com/store/apps/details?id=com.randomanimepicker",
                    [
                      {
                        text: "COPY TO CLIPBOARD",
                        style: "default",
                        onPress: async () => {
                          await Clipboard.setString(
                            "https://play.google.com/store/apps/details?id=com.randomanimepicker"
                          );
                        }
                      },
                      {
                        text: "Cancel",
                        style: "cancel"
                      }
                    ]
                  );
                }}
              >
                <Icon style={styles.eachIcon} type="Entypo" name="share" />
                <Text style={styles.eachtext}>Share the app</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.eachtextbutton}
                onPress={() => {
                  Linking.openURL(
                    "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DSXM6YD9WRT5C&source=url"
                  );
                }}
              >
                <Icon style={styles.eachIcon} type="Entypo" name="paypal" />
                <Text style={styles.eachtext}>Donate</Text>
              </TouchableOpacity> */}
              <View style={styles.divider} />
            </View>

            <View style={styles.listcontainer}>
              <Text style={styles.headertext}>OTHER</Text>
              <TouchableOpacity
                style={styles.eachtextbutton}
                onPress={() => {
                  Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.randomanimepicker"
                  );
                }}
              >
                <Icon
                  style={styles.eachIcon}
                  type="MaterialIcons"
                  name="update"
                />
                <Text style={styles.eachtext}>Check for updates</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.eachtextbutton, marginBottom: 30 }}
                onPress={() => {
                  Alert.alert(
                    "About me",
                    "My name is Oskar and I am a full stack, freelance web and app developer. I've been coding for over a year. I am love putting my ideas to live and I'd like you hear about your ideas.",
                    [
                      {
                        text: "EXIT",
                        style: "cancel"
                      }
                    ]
                  );
                }}
              >
                <Icon
                  style={styles.eachIcon}
                  type="FontAwesome"
                  name="question-circle-o"
                />
                <Text style={styles.eachtext}>About me</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    drawerColor: state.navReducer.drawerColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDrawerColor: color => {
      dispatch({ type: "SET_DRAWER_COLOR", color });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);

const styles = StyleSheet.create({
  eachIcon: {
    width: 30,
    marginRight: 10,
    fontSize: 24
  },
  header: {
    backgroundColor: "#009EE1"
  },
  title: {
    fontSize: 20,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 0,
    fontFamily: "Roboto-Medium"
  },
  body: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 14
  },
  button: {
    zIndex: 1
  },
  content: {
    padding: 20
  },
  eachtext: {
    // position: "absolute",
    // left: 30,
    fontFamily: "Roboto",
    fontSize: 18
  },
  headertext: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "gray"
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
  },
  eachtextbutton: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  }
});

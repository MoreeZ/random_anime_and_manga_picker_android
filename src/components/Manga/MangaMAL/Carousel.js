import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated
} from "react-native";
import { connect } from "react-redux";

class Carousel extends Component {
  render() {
    const { random50manga } = this.props;

    let renderXtimes = [];
    if (random50manga.length > 0) {
      for (let i = 0; i < 50; i += random50manga.length) {
        renderXtimes.push(i);
      }
      if (random50manga.length === 50) {
        renderXtimes.pop();
      }
    }
    renderXtimes.shift();

    return (
      <View style={styles.carouselContainer}>
        <Animated.View
          style={{ ...styles.carousel, translateX: this.props.spinAnim }}
          hardwareAcceleration
        >
          {renderXtimes.length > 0 ? (
            renderXtimes.map(x => (
              <View key={x} style={styles.carousel}>
                {random50manga.map(item => (
                  <ImageBackground
                    key={item.mal_id}
                    source={{ uri: item.image_url }}
                    style={styles.backgroundimage}
                  >
                    <View style={styles.eachtextbg}>
                      <Text style={styles.eachtext}>{item.title}</Text>
                    </View>
                  </ImageBackground>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.carousel}>
              {random50manga.map((item, index) => {
                if (index < 50) {
                  return (
                    <ImageBackground
                      key={item.mal_id}
                      source={{ uri: item.image_url }}
                      style={styles.backgroundimage}
                    >
                      <View style={styles.eachtextbg}>
                        <Text style={styles.eachtext}>{item.title}</Text>
                      </View>
                    </ImageBackground>
                  );
                }
              })}
            </View>
          )}

          <View style={styles.carousel}>
            {random50manga.map(item => (
              <ImageBackground
                key={item.mal_id}
                source={{ uri: item.image_url }}
                style={styles.backgroundimage}
              >
                <View style={styles.eachtextbg}>
                  <Text style={styles.eachtext}>{item.title}</Text>
                </View>
              </ImageBackground>
            ))}
          </View>
          {random50manga.map((item, index) => {
            if (index <= 5) {
              return (
                <ImageBackground
                  key={item.mal_id}
                  source={{ uri: item.image_url }}
                  style={styles.backgroundimage}
                >
                  <View style={styles.eachtextbg}>
                    <Text style={styles.eachtext}>{item.title}</Text>
                  </View>
                </ImageBackground>
              );
            }
          })}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    spinAnim: state.$navReducer.spinmangaMalCarousel,
    random50manga: state.mangaMalReducer.random50manga
  };
};

export default connect(mapStateToProps)(Carousel);

const styles = StyleSheet.create({
  carouselContainer: {
    height: 295,
    overflow: "hidden"
  },
  carousel: {
    height: "100%",
    flexDirection: "row"
  },
  backgroundimage: {
    width: 200,
    height: "100%",
    borderColor: "white",
    borderWidth: 2,
    marginRight: 10,
    overflow: "hidden"
  },
  eachtextbg: {
    position: "absolute",
    bottom: 0,
    height: 65,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 5
  },
  eachtext: {
    color: "white",
    fontFamily: "Roboto-Medium"
  }
});

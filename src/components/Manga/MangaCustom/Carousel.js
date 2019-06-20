import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";

class Carousel extends Component {
  render() {
    const { top50localManga } = this.props;
    const getRandomColor = () => {
      const letters = "456";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 3)];
      }
      return color;
    };
    let renderXtimes = [];
    if (top50localManga.length > 0) {
      for (let i = 0; i < 50; i += top50localManga.length) {
        renderXtimes.push(i);
      }
      if (top50localManga.length === 50) {
        renderXtimes.pop();
      }
    }
    renderXtimes.shift();
    return (
      <View style={styles.carouselContainer}>
        <Animated.View
          style={{ ...styles.carousel, translateY: this.props.spinCustomManga }}
          hardwareAcceleration
        >
          {renderXtimes.length > 0 ? (
            renderXtimes.map(x => (
              <React.Fragment key={x}>
                {this.props.top50localManga &&
                  this.props.top50localManga.length > 0 &&
                  this.props.top50localManga.map((each, index) => (
                    <View
                      style={{
                        ...styles.mangaContainer,
                        backgroundColor: getRandomColor()
                      }}
                      key={index}
                    >
                      <Text style={styles.mangaText}>{each}</Text>
                    </View>
                  ))}
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              {this.props.top50localManga &&
                this.props.top50localManga.length > 0 &&
                this.props.top50localManga.map((each, index) => {
                  if (index < 50) {
                    return (
                      <View
                        style={{
                          ...styles.mangaContainer,
                          backgroundColor: getRandomColor()
                        }}
                        key={index}
                      >
                        <Text style={styles.mangaText}>{each}</Text>
                      </View>
                    );
                  }
                })}
            </React.Fragment>
          )}

          <React.Fragment>
            {this.props.top50localManga &&
              this.props.top50localManga.length > 0 &&
              this.props.top50localManga.map((each, index) => (
                <View
                  style={{
                    ...styles.mangaContainer,
                    backgroundColor: getRandomColor()
                  }}
                  key={index}
                >
                  <Text style={{ ...styles.mangaText }}>{each}</Text>
                </View>
              ))}
          </React.Fragment>

          <React.Fragment>
            {this.props.top50localManga &&
              this.props.top50localManga.length > 0 &&
              this.props.top50localManga.map((each, index) => {
                if (index <= 4) {
                  return (
                    <View
                      style={{
                        ...styles.mangaContainer,
                        backgroundColor: getRandomColor()
                      }}
                      key={index}
                    >
                      <Text style={styles.mangaText}>{each}</Text>
                    </View>
                  );
                }
              })}
          </React.Fragment>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    top50localManga: state.mangaCustomReducer.top50localManga,
    spinCustomManga: state.mangaCustomReducer.spinCustomManga
  };
};

export default connect(mapStateToProps)(Carousel);

const styles = StyleSheet.create({
  mangaContainer: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  mangaText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },
  carouselContainer: {
    height: "100%",
    overflow: "hidden"
  },
  carousel: {
    flexDirection: "column"
  }
});

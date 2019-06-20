import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";

class Carousel extends Component {
  render() {
    const { top50localAnime } = this.props;
    const getRandomColor = () => {
      const letters = "456";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 3)];
      }
      return color;
    };
    let renderXtimes = [];
    if (top50localAnime.length > 0) {
      for (let i = 0; i < 50; i += top50localAnime.length) {
        renderXtimes.push(i);
      }
      if (top50localAnime.length === 50) {
        renderXtimes.pop();
      }
    }
    renderXtimes.shift();
    return (
      <View style={styles.carouselContainer}>
        <Animated.View
          style={{ ...styles.carousel, translateY: this.props.spinCustomAnime }}
          hardwareAcceleration
        >
          {renderXtimes.length > 0 ? (
            renderXtimes.map(x => (
              <React.Fragment key={x}>
                {this.props.top50localAnime &&
                  this.props.top50localAnime.length > 0 &&
                  this.props.top50localAnime.map((each, index) => (
                    <View
                      style={{
                        ...styles.animeContainer,
                        backgroundColor: getRandomColor()
                      }}
                      key={index}
                    >
                      <Text style={styles.animeText}>{each}</Text>
                    </View>
                  ))}
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              {this.props.top50localAnime &&
                this.props.top50localAnime.length > 0 &&
                this.props.top50localAnime.map((each, index) => {
                  if (index < 50) {
                    return (
                      <View
                        style={{
                          ...styles.animeContainer,
                          backgroundColor: getRandomColor()
                        }}
                        key={index}
                      >
                        <Text style={styles.animeText}>{each}</Text>
                      </View>
                    );
                  }
                })}
            </React.Fragment>
          )}

          <React.Fragment>
            {this.props.top50localAnime &&
              this.props.top50localAnime.length > 0 &&
              this.props.top50localAnime.map((each, index) => (
                <View
                  style={{
                    ...styles.animeContainer,
                    backgroundColor: getRandomColor()
                  }}
                  key={index}
                >
                  <Text style={{ ...styles.animeText }}>{each}</Text>
                </View>
              ))}
          </React.Fragment>

          <React.Fragment>
            {this.props.top50localAnime &&
              this.props.top50localAnime.length > 0 &&
              this.props.top50localAnime.map((each, index) => {
                if (index <= 4) {
                  return (
                    <View
                      style={{
                        ...styles.animeContainer,
                        backgroundColor: getRandomColor()
                      }}
                      key={index}
                    >
                      <Text style={styles.animeText}>{each}</Text>
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
    top50localAnime: state.animeCustomReducer.top50localAnime,
    spinCustomAnime: state.animeCustomReducer.spinCustomAnime
  };
};

export default connect(mapStateToProps)(Carousel);

const styles = StyleSheet.create({
  animeContainer: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  animeText: {
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

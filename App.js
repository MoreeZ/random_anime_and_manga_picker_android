import React from "react";
import store from "./src/store";
import { Provider } from "react-redux";
import { View, Animated, Dimensions, Image, Text } from "react-native";
import MainDrawer from "./src/navigation/MainDrawer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      OrientationStatus: "",
      Height_Layout: "",
      Width_Layout: "",
      startFade: new Animated.Value(1),
      fadeInText: new Animated.Value(0),
      zIndex: 1
    };
  }
  componentDidMount() {
    this.DetectOrientation();
    setTimeout(() => {
      Animated.timing(
        // Animate over time
        this.state.fadeInText, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          // easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          duration: 900 // Make it take a while
        }
      ).start();
    }, 300);
    setTimeout(() => {
      Animated.timing(
        // Animate over time
        this.state.startFade, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          // easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          duration: 300 // Make it take a while
        }
      ).start();
      setTimeout(() => {
        this.setState({
          ...this.state,
          zIndex: -1
        });
      }, 300);
    }, 2800);
  }
  DetectOrientation() {
    if (this.state.Width_Layout > this.state.Height_Layout) {
      // Write Your own code here, which you want to execute on Landscape Mode.
      this.setState({
        OrientationStatus: "Landscape Mode"
      });
    } else {
      // Write Your own code here, which you want to execute on Portrait Mode.
      this.setState({
        OrientationStatus: "Portrait Mode"
      });
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View
          style={{ width: "100%", height: "100%" }}
          onLayout={event =>
            this.setState(
              {
                Width_Layout: event.nativeEvent.layout.width,
                Height_Layout: event.nativeEvent.layout.height
              },
              () => this.DetectOrientation()
            )
          }
        >
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#444444",
              zIndex: this.state.zIndex,
              opacity: this.state.startFade
            }}
          >
            <Image
              source={require("./assets/images/highQualIcon.png")}
              style={{ height: 150, width: 150, marginBottom: 40 }}
            />
            <Animated.Text
              style={{
                color: "white",
                fontSize: 30,
                fontFamily: "Roboto-Regular",
                opacity: this.state.fadeInText
              }}
            >
              Random Anime Picker
            </Animated.Text>
          </Animated.View>
          <MainDrawer />
        </View>
      </Provider>
    );
  }
}

export default App;

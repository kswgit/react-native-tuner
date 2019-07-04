import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import Tuner from "./tuner";
import Note from "./note";
import Meter from "./meter";

export default class App extends Component {
  state = {
    note: {
      name: "A",
      octave: 4,
      frequency: 442,
    }
  };

  _update(note) {
    this.setState({ note });
  }

  componentDidMount() {
    const tuner = new Tuner();
    tuner.start();
    tuner.onNoteDetected = note => {
      if (this._lastNoteName === note.name) {
        this._update(note);
      } else {
        this._lastNoteName = note.name;
      }
    };
  }

  render() {
    return (
      <View style={style.body}>
        <StatusBar backgroundColor="#000" translucent />
        <Meter cents={this.state.note.cents} />
        <Note {...this.state.note} />
        <Text style={style.frequency}>
          {this.state.note.frequency.toFixed(1)} Hz
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  frequency: {
    fontSize: 28,
    color: "#37474f"
  }
});

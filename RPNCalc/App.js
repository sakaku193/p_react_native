import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';

const { STATUSBAR_HIGHT } = Platform.OS == "ios" ? 20 : StatusBar.currentHeight;

const CalcButton = props => {
  const flex = props.flex ? props.flex : 1
  return(
    <TouchableOpacity
      style={[styles.calcButton, {flex: flex}]}
      onPress={()=>{props.btnEvent()}}
    >
      <Text style={styles.calcButtonText}>
        {props.label}
      </Text>
    </TouchableOpacity>
  )
}

export default class App extends React.Component {

  valueButton = value => {

  }
  enterButton = () => {

  }
  calcButton = value => {

  }
  acButton = () => {

  }
  cButton = () => {

  }

  render(){
    return(
      <View style={styles.container}>
        {/* 結果表示領域 */}
        <View style={styles.results}>
          <View style={styles.resultLine}></View>
          <View style={styles.resultLine}></View>
          <View style={styles.resultLine}></View>
        </View>
        {/* ボタン表示領域 */}
        <View style={styles.buttons}>
          <View style={styles.buttonsLine}>
            <CalcButton flex={2} label={"AC"} btnEvent={() => this.acButton()} />
            <CalcButton label={"C"} btnEvent={() => this.cButton()} />
            <CalcButton label={"+"} btnEvent={() => this.calcButton("+")} />
          </View>
          <View style={styles.buttonsLine}></View>
          <View style={styles.buttonsLine}></View>
          <View style={styles.lastButtonsLinesContainer}>
            <View style={styles.twoButtonsLines}>
              <View style={styles.buttonsLine}></View>
              <View style={styles.buttonsLine}></View>
            </View>
            <View style={styles.enterButtonContainer}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  results: {
    flex: 3,
    backgroundColor: '#fff'
  },
  resultLine: {
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 5
  },
  buttonsLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
  },
  lastButtonsLinesContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  twoButtonsLines: {
    flex: 3
  },
  enterButtonContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HIGHT
  },
  calcButton: {
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    borderWidth: 1,
    backgroundColor: "#b0c4de"
  },
  calcButtonText: {
    fontSize: 20
  }
});
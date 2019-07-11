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

const CalcButtons = props => {
  return(
    <React.Fragment>
      { props.buttons.map( button => {
        return (
          <CalcButton
            key={button.label}
            flex={button.flex}
            label={button.label}
            btnEvent={button.btnEvent}
          />
        )
      })}
    </React.Fragment>
  )
}

export default class App extends React.Component {

  buttons = [
    [
      {
        label: "AC",
        flex: 2,
        btnEvent: () => {this.acButton()}
      },
      {
        label: "C",
        btnEvent: () => {this.cButton()}
      },
      {
        label: "+",
        b0c4de: () => {this.calcButton("+")}
      }
    ],
    [
      {
        label: "7",
        btnEvent: () => {this.calcButton("7")}
      },
      {
        label: "8",
        b0c4de: () => {this.calcButton("8")}
      },
      {
        label: "9",
        b0c4de: () => {this.calcButton("9")}
      },
      {
        label: "-",
        b0c4de: () => {this.calcButton("-")}
      }
    ],
    [
      {
        label: "4",
        btnEvent: () => {this.calcButton("4")}
      },
      {
        label: "5",
        b0c4de: () => {this.calcButton("5")}
      },
      {
        label: "6",
        b0c4de: () => {this.calcButton("6")}
      },
      {
        label: "*",
        b0c4de: () => {this.calcButton("*")}
      }
    ],
    [
      {
        label: "1",
        btnEvent: () => {this.calcButton("1")}
      },
      {
        label: "2",
        b0c4de: () => {this.calcButton("2")}
      },
      {
        label: "3",
        b0c4de: () => {this.calcButton("3")}
      }
    ],
    [
      {
        label: "0",
        btnEvent: () => {this.calcButton("0")}
      },
      {
        label: ".",
        b0c4de: () => {this.calcButton(".")}
      },
      {
        label: "/",
        b0c4de: () => {this.calcButton("/")}
      }
    ],
    [
      {
        label: "Enter",
        btnEvent: () => {this.enterButton()}
      }
    ]
  ]

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
            <CalcButtons buttons={this.buttons[0]} />
          </View>
          <View style={styles.buttonsLine}>
            <CalcButtons buttons={this.buttons[1]} />
          </View>
          <View style={styles.buttonsLine}>
            <CalcButtons buttons={this.buttons[2]} />
          </View>
          <View style={styles.lastButtonsLinesContainer}>
            <View style={styles.twoButtonsLines}>
              <View style={styles.buttonsLine}>
                <CalcButtons buttons={this.buttons[3]} />
              </View>
              <View style={styles.buttonsLine}>
                <CalcButtons buttons={this.buttons[4]} />
              </View>
            </View>
            <View style={styles.enterButtonContainer}>
              <CalcButtons buttons={this.buttons[5]} />
            </View>
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

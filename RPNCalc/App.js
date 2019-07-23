import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions
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
        btnEvent: () => {this.calcButton("+")}
      }
    ],
    [
      {
        label: "7",
        btnEvent: () => {this.valueButton("7")}
      },
      {
        label: "8",
        btnEvent: () => {this.valueButton("8")}
      },
      {
        label: "9",
        btnEvent: () => {this.valueButton("9")}
      },
      {
        label: "-",
        btnEvent: () => {this.calcButton("-")}
      }
    ],
    [
      {
        label: "4",
        btnEvent: () => {this.valueButton("4")}
      },
      {
        label: "5",
        btnEvent: () => {this.valueButton("5")}
      },
      {
        label: "6",
        btnEvent: () => {this.valueButton("6")}
      },
      {
        label: "*",
        btnEvent: () => {this.calcButton("*")}
      }
    ],
    [
      {
        label: "1",
        btnEvent: () => {this.valueButton("1")}
      },
      {
        label: "2",
        btnEvent: () => {this.valueButton("2")}
      },
      {
        label: "3",
        btnEvent: () => {this.valueButton("3")}
      }
    ],
    [
      {
        label: "0",
        btnEvent: () => {this.valueButton("0")}
      },
      {
        label: ".",
        btnEvent: () => {this.valueButton(".")}
      },
      {
        label: "/",
        btnEvent: () => {this.calcButton("/")}
      }
    ],
    [
      {
        label: "Enter",
        btnEvent: () => {this.enterButton()}
      }
    ]
  ]

  constructor(props){
    super(props)
    const {height, width} = Dimensions.get('window')
    this.state = {
      results: [],
      current: "0",
      dotInputed: false,
      afterValueButton: false,
      orientation: this.getOrientation(height, width)
    }
  }

  componentDidMount(){
    Dimensions.addEventListener('change', this.changeOrientation)
  }

  componentWillMount(){
    Dimensions.removeEventListener('change', this.changeOrientation)
  }

  getOrientation = (height, width) => {
    if (height > width) {
      return 'portrait'
    }
    return 'landscape'
  }

  changeOrientation = window => {
    const orientation = this.getOrientation(window.height, window.width)
    this.setState({orientation: orientation})
  }

  valueButton = value => {
    let current = this.state.current
    let dotInputed = this.state.dotInputed
    if(value == "."){
      if(!dotInputed){
        current += value
        dotInputed = true
      }
    }else if(current == "0"){
      current = value
    } else {
      current += value
    }

    this.setState({
      current: current,
      dotInputed: dotInputed,
      afterValueButton: true
    })
  }

  enterButton = () => {
    let newValue = NaN
    if (this.state.dotInputed) {
      newValue = parseFloat(this.state.current)
    } else {
      newValue = parseInt(this.state.current)
    }

    if(isNaN(newValue)){
      return
    }

    let results = this.state.results
    results = [...results, newValue]
    this.setState({
      current: "0",
      dotInputed: false,
      results: results,
      afterValueButton: false
    })
  }

  calcButton = value => {
    if (this.state.results.length < 2) {
      return
    }
    if (this.state.afterValueButton == true) {
      return
    }
    let newResults = this.state.results
    const target2 = newResults.pop()
    const target1 = newResults.pop()
    let newValue = null

    switch(value){
      case "+":
        newValue = target1 + target2
        break
      case "-":
        newValue = target1 - target2
        break
      case "*":
        newValue = target1 * target2
        break
      case "/":
        newValue = target1 / target2
        if (!isFinite(newValue)) {
          newValue = null
        }
        break
      default:
        break
    }
    if(newValue == null){
      return
    }

    newResults = [...newResults, newValue]
    this.setState({
      current: "0",
      dotInputed: false,
      results: newResults,
      afterValueButton: false
    })
  }

  acButton = () => {
    this.setState({
      current: "0",
      dotInputed: false,
      results: [],
      afterValueButton: false
    })
  }

  cButton = () => {
    this.setState({
      current: "0",
      dotInputed: false,
      afterValueButton: false
    })
  }

  render(){
    let resultFlex = 3
    if (this.state.orientation == 'landscape') {
      resultFlex = 1
    }
    return(
      <View style={styles.container}>
        {/* 結果表示領域 */}
        <View style={[styles.results, {flex: resultFlex}]}>
          <View style={styles.resultLine}></View>
          <View style={styles.resultLine}>
            <Text>{this.state.current}</Text>
          </View>
          <View style={styles.resultLine}>
            <Text>{this.state.results.join(" ")}</Text>
          </View>
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

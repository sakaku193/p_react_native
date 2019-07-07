import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;
const TODO = "@todoapp.todo";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todo:[
      ],
      currentIndex: 0,
      inputText: ""
    }
  }

  componentDidMount(){
    this.loadTodo();
  }

  // loadTodo = async() =>{
  //   try{
  //     const todoString = await AsyncStorage.getItem(TODO);
  //     if(todoString){
  //       const todo = JSON.parse(todoString);
  //       const currentIndex = todo.length;
  //       this.setState({todo: todo, currentIndex: currentIndex});
  //     }
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  loadTodo = () => {
    AsyncStorage.getItem(TODO).then(todoString => {
      const todo = JSON.parse(todoString);
      const currentIndex = todo.length;
      this.setState({todo:todo, currentIndex:currentIndex});
    }).catch((e) => {
      console.log(e);
    });
  }


  saveTodo = async(todo) => {
    try {
      const todoString = JSON.stringify(todo);
      await AsyncStorage.setItem(TODO, todoString);
    } catch (e) {
      console.log(e);
    }
  }


  onAddItem = () => {
    const title =this.state.inputText;
    if(title == ""){
      return;
    }

    const id = this.state.currentIndex + 1;
    const newTodo = {id: id, title:title, done:false};
    const todo = [...this.state.todo, newTodo];
    this.setState({
      todo: todo,
      currentIndex: id,
      inputText: ""
    });
    this.saveTodo(todo);
  }

  render(){
    return(
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <View style={style.filter}>
          <Text>Filterがここに表示されます</Text>
        </View>
        <ScrollView style={style.todolist}>
          <Text>ここにTODOリストが表示されます</Text>
          <FlatList
            data={this.state.todo}
            renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtractor={(item) => "todo_" + item.id}
          />
        </ScrollView>
        <View style={style.input}>
          <TextInput
            onChangeText={text => this.setState({inputText: text})}
            style={style.inputText}
            value={this.state.inputText}
          />
          <Button
            onPress={this.onAddItem}
            title="add"
            style={style.inputButton}
            color="#841584"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT
  },
  filter: {
    height: 30
  },
  todolist: {
    flex: 1
  },
  input:{
    height: 30,
    flexDirection: 'row'
  },
  inputText:{
    flex: 1
  },
  inputButton:{
    width: 100
  }
})

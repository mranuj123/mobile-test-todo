import { data } from "@/data/todo";
import { useState } from "react";
import { Pressable, Text, TextInput, View,StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text,setText] = useState("");

  const addTodo = () => {
      if(text.trim()){
        const newId = todos.length > 0 ? todos[0].id + 1 : 1;
        setTodos([{id:newId,title:text,completed:false},...todos]);
        setText("");
      }
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo)=>(
        todo.id ===id ? {...todo,completed:!todo.completed}:todo
      ))
    )
  }

  const removeTodo=(id)=>{
    setTodos(
      todos.filter(todo=>todo.id !== id)
    )
  }

  const renderItems = ({item}) => (
    <View style={styles.todoItem}>
      <Text 
      style={[styles.todoText, item.completed && styles.completedText ]}
      onPress={()=>toggleTodo(item.id)}
      >
        {item.title}
        </Text>
      <Pressable onPress={()=>removeTodo(item.id)}>
      <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
      </View>
  )
  return (
    <SafeAreaProvider style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.input}
            placeholder="Add a todo"
            placeholderTextColor="gray"
            value={text}
            onChangeText={setText}
            />
            <Pressable onPress={addTodo} style={styles.addButton}> 
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
        </View>
        <FlatList
        data={todos}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{flexGrow:1}}
        />
    </SafeAreaProvider>
  );
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"black"
  },
  inputContainer:{
    flexDirection:"row",
    alignItems:"center",
   marginBottom:10,
   padding:10,
   width:"100%",
   maxWidth:1024,
   marginHorizontal:"auto",
   pointerEvents:"auto"
  },
  input:{
    flex:1,
   borderColor:"gray",
   borderWidth:1,
   borderRadius:5,
   padding:5,
   marginRight:10,
   color:"white",
   fontSize:18,
   minWidth:0
  },
  addButton:{
    backgroundColor:"white",
    padding:10,
    borderRadius:5
  },
  addButtonText:{
    fontSize:18,
    color:"black"
  }
  ,
  todoItem:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    gap:4,
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:"gray",
    width:"100%",
    maxWidth:1024,
    marginHorizontal:"auto",
    pointerEvents:'auto'

  },
  todoText:{
    flex:1,
    color:"white",
    fontSize:18
  },
  completedText:{
    textDecorationLine:"line-through",
    color:"gray"
  }
 
})

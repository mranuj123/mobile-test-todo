import { data } from "@/data/todo";
import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View,StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium, useFonts} from "@expo-google-fonts/inter"
import { ThemeContext } from "@/context/ThemeContext";
import Octicons from '@expo/vector-icons/Octicons';

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text,setText] = useState("");
  const {theme,colorScheme,setColorScheme} = useContext(ThemeContext);


  const [loaded,error] = useFonts({
    Inter_500Medium
  })

  if(!loaded && !error){
    return null;
  }
  const styles = createStyles(theme,colorScheme);
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
            <Pressable 
            onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
            style={{marginLeft:10}}
            >
              {
                colorScheme === 'dark' ?
                <Octicons name = "moon" size={36} color={theme.text} selectable={undefined} style={{width:36}}/> 
                : <Octicons name = "sun" size={36} color={theme.text} selectable={undefined} style={{width:36}} />
              }
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

function createStyles(theme,colorScheme)
{ 

return StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.background
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
   color:theme.text,
   fontSize:18,
   fontFamily:"Inter_500Medium",
   minWidth:0
  },
  addButton:{
    backgroundColor:theme.button,
    padding:10,
    borderRadius:5
  },
  addButtonText:{
    fontSize:18,
    color:colorScheme === 'dark' ? 'black' : 'white',
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
    color:theme.text,
    fontSize:18,
    fontFamily:"Inter_500Medium",
  },
  completedText:{
    textDecorationLine:"line-through",
    color:"gray"
  }
 
})
}

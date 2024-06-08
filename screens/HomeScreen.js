import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { deleteDataInFirestore, getAllDataFromFirestore } from "../Store/Firestore_CRUD";

function HomeScreen() {

    const [systemUserList, setSystemUserList] = useState([]);

    useEffect(()=>{
        fatchData();
    },[]);

    const fatchData = async() => {

        const list = await getAllDataFromFirestore({_collection: "users"});
        console.log(list);
        setSystemUserList(list);
    }

    const handleClickUser = async (id) => {
        const status = await deleteDataInFirestore({ _collection: "users" , _id : id });
        if(status){
            Alert("data Deleted");
        }
    }

    return (
      <View>
        <Text>Home Page</Text>
        <Text>change</Text>
        {systemUserList.map((user) => (
          <View>
            <Text>{user.lastName}</Text>
            <Button title="X" onPress={() => handleClickUser(user._id)} />
          </View>
        ))}
      </View>
    );
}

export default HomeScreen;
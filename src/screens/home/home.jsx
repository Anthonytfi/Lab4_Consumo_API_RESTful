import { View, Text, Button } from "react-native";
import { styles } from "./home.styles";

export const HomeScreen = ({navigation}) =>{
    return <View>
        <Text style={styles.texto}>Estoy en Home</Text>
        <Button 
            onPress={()=>navigation.navigate("Autor")}
            title="Ir a la pantalla Autor"
        ></Button>
        <Button 
            onPress={()=>navigation.navigate("Genero")}
            title="Ir a la pantalla Género"
        ></Button>
        <Button 
            onPress={()=>navigation.navigate("Libro")}
            title="Ir a la pantalla Libro"
        ></Button>
    </View>
}


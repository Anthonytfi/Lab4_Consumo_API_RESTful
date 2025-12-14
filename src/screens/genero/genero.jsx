import { FlatList, Button, Alert, View } from "react-native";
import { Container } from "../../components/container/container";
import { useCallback, useState } from "react";
import { Card } from "../../screens/card/card"; 
import { ENDPOINTS } from "../../config/api";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./genero.styles";

export const GeneroScreen = ({ navigation }) => {
    const [generos, setGeneros] = useState([]);

    const getGeneros = async () => {
        try {
            const response = await fetch(ENDPOINTS.GENERO);
            const json = await response.json();
            setGeneros(json);
        } catch (error) {
            console.log("Error leyendo géneros:", error);
        }
    }

    const deleteGenero = async (id) => {
        Alert.alert("Eliminar", "¿Borrar género?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Eliminar", 
                onPress: async () => {
                    await fetch(`${ENDPOINTS.GENERO}/${id}`, { method: 'DELETE' });
                    getGeneros();
                }
            }
        ]);
    }

    useFocusEffect(useCallback(() => { getGeneros(); }, []));

    return (
        <Container>
            <View style={styles.buttonContainer}>
                <Button title="Nuevo Género" onPress={() => navigation.navigate("GeneroForm")} />
            </View>
            <FlatList
                data={generos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card 
                        id={item.id}
                        nombre={item.nombre} 
                        nacionalidad={item.descripcion} 
                        onDelete={() => deleteGenero(item.id)}
                        onUpdate={() => navigation.navigate("GeneroForm", { genero: item })}
                    />
                )}
            />
        </Container>
    );
}
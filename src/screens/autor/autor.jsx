import { FlatList, Button, Alert } from "react-native";
import { Container } from "../../components/container/container";
import { useCallback, useState } from "react";
import { Card } from "../../screens/card/card";
import { ENDPOINTS } from "../../config/api";
import { useFocusEffect } from "@react-navigation/native";
 
export const AutorScreen = ({ navigation }) => {
    const [autores, setAutores] = useState([]);

    const getAutores = async () => {
        try {
            const response = await fetch(ENDPOINTS.AUTOR);
            const json = await response.json();
            setAutores(json);
        } catch (error) {
            console.log("Error al leer autores:", error);
        }
    }

    // Función eliminar (DELETE)
    const deleteAutor = async (id) => {
        Alert.alert("Eliminar", "¿Seguro que quieres borrar este autor?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Eliminar", 
                onPress: async () => {
                    try {
                        const response = await fetch(`${ENDPOINTS.AUTOR}/${id}`, {
                            method: 'DELETE'
                        });
                        if (response.ok) {
                            getAutores(); // Recargamos la lista
                        }
                    } catch (error) {
                        console.log("Error al eliminar:", error);
                    }
                }
            }
        ]);
    }

    useFocusEffect(
        useCallback(() => {
            getAutores();
        }, [])
    );

    return (
        <Container>
            <Button 
                title="Crear un nuevo autor"
                onPress={() => navigation.navigate("AutorForm")}
            />
            <FlatList
                data={autores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card 
                        id={item.id}
                        nombre={item.nombre}
                        nacionalidad={item.nacionalidad}
                        onDelete={() => deleteAutor(item.id)}
                        onUpdate={() => navigation.navigate("AutorForm", { autor: item })}
                    />
                )}
            />
        </Container>
    );
}
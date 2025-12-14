import { FlatList, Button, Alert } from "react-native";
import { Container } from "../../components/container/container";
import { useCallback, useState } from "react";
import { Card } from "../../screens/card/card";
import { ENDPOINTS } from "../../config/api";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./libro.styles";

export const LibroScreen = ({ navigation }) => {
    const [libros, setLibros] = useState([]);

    const getLibros = async () => {
        try {
            const response = await fetch(ENDPOINTS.LIBRO);
            const json = await response.json();
            setLibros(json);
        } catch (error) {
            console.log("Error leyendo libros:", error);
        }
    }
    const deleteLibro = async (id) => {
        Alert.alert("Eliminar", "¿Seguro que quieres borrar este libro?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Eliminar", 
                onPress: async () => {
                    try {
                        const response = await fetch(`${ENDPOINTS.LIBRO}/${id}`, {
                            method: 'DELETE'
                        });
                        if (response.ok) {
                            getLibros();
                        }
                    } catch (error) {
                        console.log("Error eliminando:", error);
                    }
                }
            }
        ]);
    }

    useFocusEffect(
        useCallback(() => {
            getLibros();
        }, [])
    );

    return (
        <Container>
            <Button 
                title="Nuevo Libro"
                onPress={() => navigation.navigate("LibroForm")}
            />
            <FlatList
                data={libros}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card 
                        id={item.id}
                        nombre={item.titulo}
                        nacionalidad={item.editorial} 
                        onDelete={() => deleteLibro(item.id)}
                        onUpdate={() => navigation.navigate("LibroForm", { libro: item })}
                    />
                )}
            />
        </Container>
    );
}
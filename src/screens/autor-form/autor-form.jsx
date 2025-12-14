import { View, TextInput, Button, Alert } from "react-native";
import { Container } from "../../components/container/container";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "../../config/api";
import { styles } from "./autor-form.styles"; 

export const AutorFormScreen = ({ navigation, route }) => {
    const params = route.params || {};
    const autorEditar = params.autor;
    const [nombre, setNombre] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if (autorEditar) {
            setNombre(autorEditar.nombre);
            setNacionalidad(autorEditar.nacionalidad);
            setId(autorEditar.id);
            navigation.setOptions({ title: 'Editar Autor' });
        }
    }, [autorEditar]);

    const saveAutor = async () => {
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${ENDPOINTS.AUTOR}/${id}` : ENDPOINTS.AUTOR;
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre,
                    nacionalidad: nacionalidad
                })
            });
            if (response.ok) {
                Alert.alert("Éxito", "Operación realizada correctamente", [
                    { text: "Listo", onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            console.log("Error " + error);
            Alert.alert("Error", "Error en " + error);
        }
    }

    return (
        <Container>
            <View style={styles.formContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Ingrese el autor"
                    value={nombre}
                    onChangeText={(text) => setNombre(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Ingrese la nacionalidad"
                    value={nacionalidad}
                    onChangeText={(text) => setNacionalidad(text)}
                />
                <Button
                    title={id ? "Actualizar" : "Guardar"}
                    onPress={() => saveAutor()}
                />
            </View>
        </Container>
    );
}
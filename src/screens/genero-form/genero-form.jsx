import { View, TextInput, Button, Alert, Text } from "react-native";
import { Container } from "../../components/container/container";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "../../config/api";
import { styles } from "./genero-form.styles";

export const GeneroFormScreen = ({ navigation, route }) => {
    const params = route.params || {};
    const generoEditar = params.genero;
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if (generoEditar) {
            setNombre(generoEditar.nombre);
            setDescripcion(generoEditar.descripcion);
            setId(generoEditar.id);
            navigation.setOptions({ title: 'Editar Género' });
        } else {
            navigation.setOptions({ title: 'Crear Género' });
        }
    }, [generoEditar]);

    const saveGenero = async () => {
        if (!nombre) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${ENDPOINTS.GENERO}/${id}` : ENDPOINTS.GENERO;
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, descripcion })
            });
            if (response.ok) {
                Alert.alert("Éxito", "Género guardado", [{ text: "Ok", onPress: () => navigation.goBack() }]);
            } else {
                Alert.alert("Error", "No se pudo guardar el género");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Error de conexión");
        }
    }

    return (
        <Container>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nombre del Género:</Text>
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Ciencia Ficción" />

                <Text style={styles.label}>Descripción:</Text>
                <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} placeholder="Ej: Libros futuristas..." />

                <Button title={id ? "Actualizar" : "Guardar"} onPress={saveGenero} />
            </View>
        </Container>
    );
}
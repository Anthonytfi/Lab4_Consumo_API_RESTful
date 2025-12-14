import { View, TextInput, Button, Alert, Text } from "react-native";
import { Container } from "../../components/container/container";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "../../config/api";
import { styles } from "./libro-form.styles";

export const LibroFormScreen = ({ navigation, route }) => {
    
    const params = route.params || {};
    const libroEditar = params.libro;
    const [titulo, setTitulo] = useState('');
    const [editorial, setEditorial] = useState('');
    const [autorId, setAutorId] = useState(''); 
    const [generoId, setGeneroId] = useState(''); 
    const [id, setId] = useState(null);
    useEffect(() => {
        if (libroEditar) {
            setTitulo(libroEditar.titulo);
            setEditorial(libroEditar.editorial);
            setAutorId(libroEditar.autor_id.toString());
            setGeneroId(libroEditar.genero_id.toString());
            setId(libroEditar.id);
            navigation.setOptions({ title: 'Editar Libro' });
        } else {
            navigation.setOptions({ title: 'Crear Libro' });
        }
    }, [libroEditar]);
    // Guardar
    const saveLibro = async () => {
        if (!titulo || !autorId || !generoId) {
            Alert.alert("Error", "Título, Autor ID y Género ID son obligatorios");
            return;
        }
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${ENDPOINTS.LIBRO}/${id}` : ENDPOINTS.LIBRO;
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    titulo: titulo,
                    editorial: editorial,
                    autor_id: parseInt(autorId),
                    genero_id: parseInt(generoId)
                })
            });
            if (response.ok) {
                Alert.alert("Éxito", "Libro guardado correctamente", [
                    { text: "Ok", onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert("Error", "No se pudo guardar. Verifica que el ID de Autor y Género existan.");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Error de conexión");
        }
    }

    return (
        <Container>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Título del Libro:</Text>
                <TextInput 
                    style={styles.input} 
                    value={titulo} 
                    onChangeText={setTitulo}
                    placeholder="Ej: El Principito"
                />

                <Text style={styles.label}>Editorial:</Text>
                <TextInput 
                    style={styles.input} 
                    value={editorial} 
                    onChangeText={setEditorial}
                    placeholder="Ej: Santillana"
                />

                <Text style={styles.label}>ID del Autor (Número):</Text>
                <TextInput 
                    style={styles.input} 
                    value={autorId} 
                    onChangeText={setAutorId}
                    keyboardType="numeric"
                    placeholder="Ej: 1"
                />

                <Text style={styles.label}>ID del Género (Número):</Text>
                <TextInput 
                    style={styles.input} 
                    value={generoId} 
                    onChangeText={setGeneroId}
                    keyboardType="numeric"
                    placeholder="Ej: 2"
                />

                <Button title={id ? "Actualizar Libro" : "Guardar Libro"} onPress={saveLibro} />
            </View>
        </Container>
    );
}
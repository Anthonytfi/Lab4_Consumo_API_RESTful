import { View, Text, Button } from "react-native";
import { styles } from "./card.styles";

export const Card = (props) => {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>ID: { props.id }</Text>
            <Text style={styles.texto}>Nombre: { props.nombre }</Text>
            <Text style={styles.texto}>Nacionalidad: { props.nacionalidad }</Text>
            <View style={styles.buttonContainer}>
                <Button color="red" title="Eliminar" onPress={ props.onDelete }></Button>
                <Button title="Actualizar" onPress={ props.onUpdate }></Button>
            </View>
        </View>
    )
}
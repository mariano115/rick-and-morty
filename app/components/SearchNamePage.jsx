import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { getRickAndMortyCharacter } from "../services/rickAndMorty";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default SearchNamePage = () => {

    const [listCharacter, setListCharacter] = useState([]);
    const [info, setInfo] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [inputCharacterName, setInputCharacterName] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            const list = await getRickAndMortyCharacter(inputCharacterName);
            setListCharacter(list.data.results);
            setInfo(list.data.info);
        };

        fetchCharacters();
    }, [inputCharacterName]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, styles.shadow]}
            onPress={() => {
                setSelectedCharacter(item);
                setModalVisible(true);
            }}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <Text style={styles.textCard}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setInputCharacterName}
                value={inputCharacterName}
            />
            <FlatList
                data={listCharacter}
                keyExtractor={(item) => item.id}
                renderItem={renderItem} />
            {selectedCharacter && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Image
                                source={{ uri: selectedCharacter.image }}
                                style={styles.modalImage}
                            />
                            <Text style={styles.modalText}>{selectedCharacter.name}</Text>
                            <Text style={styles.modalText}>Status: {selectedCharacter.status}</Text>
                            <Text style={styles.modalText}>Species: {selectedCharacter.species}</Text>
                            <Text style={styles.modalText}>Gender: {selectedCharacter.gender}</Text>
                            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )};
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#bababa",
        width: "95%",
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    shadow: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },

    textCard: {
        fontSize: 20
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 50,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
});
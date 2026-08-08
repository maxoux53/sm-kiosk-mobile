import { JSX, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { styles } from "../styles";
import { useAuth } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Event } from "../types/items";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "../api/connect";

export default function EventMembership(): JSX.Element {
    const { leaveEvent } = useAuth();
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        const getEvent = async () => {
            try {
                const eventId = Number(await AsyncStorage.getItem('eventId'));
                setEvent(await connect<Event>(`/interact/event/${eventId}/`, "GET"))
            } catch(e) {
                Alert.alert(
                    "Erreur",
                    `Une erreur est survenue : ${e}`,
                    [
                        { text: "Ok" }
                    ]
                );
            }
        };
        getEvent();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                event ? (
                    <View style={localStyles.contentContainer}>
                        <Text style={localStyles.subtitle}>Vous avez rejoint l'événement :</Text>
                        <Text style={[styles.title, localStyles.titleSpacing]}>{event.name}</Text>
                        
                        <Image 
                            source={{ uri: event.image }} 
                            style={localStyles.image}
                            resizeMode="cover"
                        />

                        <TouchableOpacity style={[styles.button, { marginTop: 60 }]} onPress={leaveEvent}>
                            <Text style={[styles.buttonText, { textAlign: "center" }]}>Quitter l'évènement</Text>
                        </TouchableOpacity>
                    </View>
                ) : <></>
            }
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    subtitle: {
        fontSize: 18,
        color: "#000",
        textAlign: "center",
        fontWeight: "400",
    },
    titleSpacing: {
        marginTop: 10,
        marginBottom: 40,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 8,
        backgroundColor: '#E5E5EA',
    }
});

import { JSX, use, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SymbolView } from "expo-symbols";
import { AccountStackParamList } from "../../types/navigation";
import { styles } from "../../styles";
import { useAuth } from "../../contexts/AuthContext";
import { connect } from "../../api/connect";

type user = {
    first_name: string,
    last_name: string,
    email: string,
    avatar: string | null
}

export default function ProfileScreen(): JSX.Element {
    const navigation: NativeStackNavigationProp<AccountStackParamList> = useNavigation();
    const [user, setUser] = useState<user>();
    const { logout } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await connect<user>("/interact/me", "GET");
                setUser({ first_name: res.first_name, last_name: res.last_name, email: res.email, avatar: res.avatar });
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
        getUser();
    }, []);

    return (
        <View style={styles.container}>
            {
                user?.avatar ? (
                    <Image
                        source={{ uri: user.avatar }}
                        style={{ width: 200, height: 200 }}
                        resizeMode="cover"
                    />
                ) :
                (
                    <SymbolView
                        name="person.crop.square.badge.camera"
                        size={200}
                        type="monochrome"
                        tintColor="black"
                    />
                )
            }
            
            
            <Text style={styles.title}>{`${user?.first_name} ${user?.last_name}`}</Text>
            <Text style={styles.profileEmail}>{`${user?.email}`}</Text>

            <View style={{ height: 80 }} /> 

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("OrderHistory")}
            >
                <Text style={styles.buttonText}>Historique des commandes</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                    logout();
                }}
            >
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}

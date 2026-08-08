import { type JSX, useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountStackParamList } from "../../types/navigation";
import { styles } from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { connect } from "../../api/connect";

type res = {
    token: string,
    user: {
        id: number,
        is_admin: boolean
    }
}

export default function LoginScreen(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<AccountStackParamList>>();
    const { login, setIsLoggedIn, joinEvent } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                await connect("/interact/me", "GET");
                setIsLoggedIn(true);
            } catch(e) {
                setIsLoggedIn(false);
            }
        };
        checkLoggedIn();
    }, [setIsLoggedIn]);

    return (
        <SafeAreaView style={styles.whiteContainer}>
            <KeyboardAvoidingView>
                <View style={styles.loginHeaderContainer}>
                    <Text style={styles.appTitle}>SmartKiosk</Text>
                </View>

                <View style={styles.loginFormContainer}>
                    <Text style={styles.sectionTitle}>
                        Se connecter
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="mail@domaine.be"
                        placeholderTextColor="#C7C7CC"
                        value={email}
                        onChangeText={setEmail}
                        
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="#C7C7CC"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.continueButton,
                        ]}
                        onPress={async () => {
                            try {
                                let errorMessage: string = "";
                                if (email.length < 1 || email.length > 80) {
                                    errorMessage += "- l'email est requis et doit être plus petit que 80 caractères\n";
                                }
                                if (password.length < 6 || password.length > 30) {
                                    errorMessage += "- le mot de passe doit avoir au moins 6 caractères et doit être plus petit que 80 caractères\n";
                                }
                                if (!email.includes("@") || !email.includes(".")) {
                                    errorMessage += "- l'email doit contenir au moins un @ et un .\n";
                                }
                                if (errorMessage !== "") {
                                    Alert.alert("Erreur de connexion", errorMessage);
                                } else {
                                    const res = await connect<res>("/login", "POST", {
                                        email: email,
                                        password: password
                                    });
                                    login(res.token, res.user.id);
                                }
                                
                            } catch (e) {
                                Alert.alert(
                                    "Erreur de la connexion",
                                    `Une erreur est survenue lors de la connexion à votre compte : ${e}`
                                );
                            }
                            
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Continuer
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.createAccountButton}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.createAccountText}>
                            Créer un compte
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginFooter}>
                    <Text style={styles.loginFooterText}>
                        En cliquant sur continuer, vous acceptez nos
                        <Text style={styles.bold}> CGU</Text> et
                        <Text style={styles.bold}> Politique de confidentialité
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

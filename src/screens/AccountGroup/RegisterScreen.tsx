import { type JSX, useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Asset, launchImageLibrary } from 'react-native-image-picker';
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

export default function RegisterScreen(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<AccountStackParamList>>();
    const { login, setIsLoggedIn } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatar, setAvatar] = useState<Asset | undefined>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");;

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
                        S'enregister
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        placeholderTextColor="#C7C7CC"
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Nom de famille"
                        placeholderTextColor="#C7C7CC"
                        value={lastName}
                        onChangeText={setLastName}
                    />

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

                    <TouchableOpacity style={[styles.input, { justifyContent: "center" }]} onPress={() => {
                        if (avatar) {
                            setAvatar(undefined);
                        } else {
                            launchImageLibrary(
                              { mediaType: "photo", quality: 1, includeBase64: true },
                              (response) => {
                                if (response.assets?.[0]) setAvatar(response.assets[0]);
                              }
                            );
                        }

                    }}>
                        <Text>{avatar ? avatar.fileName + " X" : "Choisir une photo (optionnel)"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.continueButton,
                        ]}
                        onPress={async () => {
                            try {
                                let errorMessage: string = "";
                                if (firstName.length < 1 || firstName.length > 20) {
                                    errorMessage += "- le prénom est requis et doit être plus petit que 20 caractères\n";
                                }
                                if (lastName.length < 1 || lastName.length > 40) {
                                    errorMessage += "- le nom de famille est requis et doit être plus petit que 40 caractères\n";
                                }
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
                                    let avatarId: string | null = null;

                                    if (avatar) {

                                        const { uploadURL } = await connect<{ uploadURL: string }>("/img-upload", "GET");

                                        const formData = new FormData();


                                        formData.append('file', {
                                            uri: avatar.uri,
                                            name: avatar.fileName,
                                            type: avatar.type ?? 'application/octet-stream',
                                        } as any);

                                        const response = await fetch(uploadURL, {
                                            method: 'POST',
                                            body: formData,
                                        });

                                        if (!response.ok) {
                                            Alert.alert("Erreur d'envoi de l'avatar", "Une erreur est survenue lors de l'envoi de votre avatar !");
                                        } else {
                                            const data = (await response.json()) as { result?: { id?: string } };
                                            avatarId = data.result?.id ?? null;

                                            if (!avatarId) {
                                                Alert.alert("Erreur d'envoi de l'avatar", "La réponse d'upload ne contient pas d'identifiant d'image.");
                                            }
                                        }

                                    }
                                    await connect<res>("/signup", "POST", {
                                        first_name: firstName,
                                        last_name: lastName,
                                        email: email,
                                        password: password,
                                        is_admin: false,
                                        avatar: avatarId
                                    });

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

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>ou</Text>
                        <View style={styles.separatorLine} />
                    </View>


                    <TouchableOpacity
                        style={styles.createAccountButton}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.createAccountText}>
                            Se connecter
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

import { JSX, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SymbolView } from "expo-symbols";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { styles } from "../styles";
import { useAuth } from "../contexts/AuthContext";

export default function JoinEventLanding(): JSX.Element {
    const { joinEvent } = useAuth();
    const [scanning, setScanning] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (scanning) {
        return (
            <View style={StyleSheet.absoluteFill}>
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                    onBarcodeScanned={({ data }: BarcodeScanningResult) => {
                        console.log("QR Code scanned:", data);
                        setScanning(false);
                        joinEvent(Number(data));
                    }}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                />
                <View style={[localStyles.overlay, StyleSheet.absoluteFillObject]}>
                    <TouchableOpacity style={localStyles.closeButton} onPress={() => setScanning(false)}>
                        <Text style={localStyles.closeText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <SymbolView 
                name="qrcode" 
                size={300} 
                tintColor="black" 
                type="monochrome"
            />
            
            <Text style={styles.title}>Rejoindre un évènement</Text>
            <Text style={styles.description}>
                Scannez un code QR pour rejoindre un évènement
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (!permission?.granted) {
                        requestPermission();
                    }
                    setScanning(permission?.granted ?? false); // terrifiant
                }}
            >
                <SymbolView name="camera.viewfinder" size={20} tintColor="white" />
                <Text style={styles.buttonText}>Scanner un code QR</Text>
            </TouchableOpacity>
        </View>
    );
}

const localStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 100,
    },
    closeButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: 'white',
        fontSize: 18,
    }
});

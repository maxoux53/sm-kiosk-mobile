import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Common
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    flexContainer: {
        flex: 1,
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 27.5,
        fontWeight: "bold",
        marginTop: 30,
        textAlign: "center"
    },
    description: {
        fontSize: 18,
        color: "#666",
        textAlign: "left",
        marginTop: 20,
        marginBottom: 40
    },
    button: {
        backgroundColor: "#1C1C1E",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 14,
        gap: 10,
        width: "100%"
    },
    buttonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "600"
    },
    
    // Headers
    header: {
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
    },

    // Product Bottom Sheet
    bottomSheetContentContainer: {
        flex: 1,
        padding: 24,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    bottomSheetFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quantityButton: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: 'black',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 100,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Login Screen
    loginScrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    loginHeaderContainer: {
        marginTop: 60,
        alignItems: "center",
    },
    appTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
    },
    loginFormContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 30,
        color: "#000",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#E5E5EA",
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    continueButton: {
        marginTop: 10,
        width: "100%",
    },
    separatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
        width: "100%",
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E5EA",
    },
    separatorText: {
        marginHorizontal: 10,
        color: "#8E8E93",
        fontSize: 14,
    },
    createAccountButton: {
        marginBottom: 20,
    },
    createAccountText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "400",
    },
    loginFooter: {
        alignItems: "center",
        marginTop: "auto",
        paddingBottom: 20,
    },
    loginFooterText: {
        fontSize: 12,
        color: "#8E8E93",
        textAlign: "center",
        lineHeight: 18,
    },
    bold: {
        fontWeight: "600",
        color: "#000",
    },

    // Profile Screen
    profileEmail: {
        fontSize: 18,
        color: "#8E8E93",
        marginTop: 10,
        textAlign: "center",
    },
    logoutButton: {
        marginTop: 30,
        padding: 10,
    },
    logoutText: {
        fontSize: 17,
        color: "#3C3C4399",
        textAlign: "center",
    },

    // Order History
    orderContainer: {
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    orderTableStyle: {
        flex: 0,
    },

    // Order Table
    listHeader: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    columnHeaderArticle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        width: 80, 
    },
    columnHeaderDescription: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        flex: 1,
    },
    columnHeaderPrice: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    orderTableListContent: {
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'flex-start',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemCategory: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    itemQuantity: {
        fontSize: 14,
        color: '#000',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    summaryContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#333',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: 'black',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    orderButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

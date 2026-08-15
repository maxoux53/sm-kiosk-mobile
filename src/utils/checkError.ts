import { isAxiosError } from "axios";

export const checkError = (e: Error): string => {
    if (isAxiosError(e)) {
        const status = e.response?.status;

        if (!status) {
            return "Erreur serveur !";
        }

        switch (status) {
            case 400:
                return "Requête invalide !";
            case 401:
                return 'Accès interdit !';
            case 403:
                return "Accès interdit !";
            case 404:
                return "Ressource non trouvée !";
            case 409:
                return "Conflit de données !";
            case 422:
                return "Données invalides !";
            case 500:
                return "Erreur serveur !";
            default:
                return "Code erreur inconnu !";
        }
    }

    return `Erreur inconnue ! ${typeof e}`;
}

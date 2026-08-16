import { USER } from "../constants/constraints";

interface SignupFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/**
 * Valide le formulaire d'inscription selon les mêmes règles que l'API,
 * afin d'éviter un `400 Validation failure` peu explicite.
 *
 * @returns Le message d'erreur à afficher, ou `undefined` si tout est valide.
 */
export const validateSignupForm = ({
    firstName,
    lastName,
    email,
    password
}: SignupFormValues): string | undefined => {
    const first = firstName.trim();
    const last = lastName.trim();
    const mail = email.trim();

    if (!first || !last || !mail || !password) {
        return "Veuillez remplir tous les champs.";
    }

    if (first.length > USER.FIRST_NAME_MAX) {
        return `Le prénom ne peut pas dépasser ${USER.FIRST_NAME_MAX} caractères.`;
    }

    if (last.length > USER.LAST_NAME_MAX) {
        return `Le nom ne peut pas dépasser ${USER.LAST_NAME_MAX} caractères.`;
    }

    if (mail.length > USER.EMAIL_MAX) {
        return `L'email ne peut pas dépasser ${USER.EMAIL_MAX} caractères.`;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        return "Veuillez saisir une adresse email valide.";
    }

    if (password.length < USER.PASSWORD_MIN) {
        return `Le mot de passe doit contenir au moins ${USER.PASSWORD_MIN} caractères.`;
    }

    if (password.length > USER.PASSWORD_MAX) {
        return `Le mot de passe ne peut pas dépasser ${USER.PASSWORD_MAX} caractères.`;
    }

    return undefined;
};

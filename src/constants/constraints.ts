/**
 * Contraintes de validation alignées sur le backend
 * (`sm-kiosk/src/constraint-constants.ts`).
 *
 * Toute divergence provoque un `400 Validation failure` côté API.
 */
export const USER = {
    FIRST_NAME_MAX: 20,
    LAST_NAME_MAX: 40,
    EMAIL_MAX: 80,
    PASSWORD_MIN: 6,
    PASSWORD_MAX: 30
} as const;

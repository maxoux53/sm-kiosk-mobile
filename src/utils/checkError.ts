import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const checkError = (error: unknown, setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>, redirect?: string) => {


  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status) {
      if (status === 400) {
        setErrorMessage("Requête invalide !");
      } else if (status === 401) {
        //navigate("/login");
      } else if (status === 403) {
        setErrorMessage("Accès interdit !");
      } else if (status === 404) {
        setErrorMessage("Ressource non trouvée !");
      } else if (status === 409) {
        setErrorMessage("Conflit de données !");
      } else if (status === 422) {
        setErrorMessage("Données invalides !");
      } else if (status === 500) {
        setErrorMessage("Erreur serveur !");
      } else {
        setErrorMessage("Code erreur inconnue !");
      }
    } else {
      setErrorMessage("Erreur serveur !");
    }
  } else {
    setErrorMessage(`Erreur inconnue ! ${error}`);
  }
}

import { useEffect } from "react";
import useUrlParams from "../hooks/userUrlParams";
import DashBorad from "../components/DashBoard";
import Box from "../components/Box";
import Form from "../components/Form";
import "./Home.css";
import OneSignal from "react-onesignal";

function Home() {
  const params = useUrlParams();
  
  const boxParams = {
    consumo: params.consumo,
    immessa: params.immessa,
  };
  
  const formParams = {
    data: params.data_trigger?.toString(),
    potenza_trigger: params.potenza_trigger?.toString(),
    potenza_attuale: params.potenza_attuale?.toString(),
    durata: params.durata_trigger?.toString(),
  };

  useEffect(() => {
    async function setupOneSignal() {
      try {
        // Inizializza OneSignal
        await OneSignal.init({
          appId: "9aae352d-573e-4ab8-8838-4c645fcb902b",
          safari_web_id: "web.onesignal.auto.4bf12d4e-2e1c-4e2f-be7e-e4e315c9ca64",
          allowLocalhostAsSecureOrigin: true, // Solo per sviluppo
        });

        console.log("OneSignal inizializzato");

        // Verifica se OneSignal è già inizializzato
        if (OneSignal.User) {
          // Effettua il login con un ID univoco dell'utente
          // Sostituisci "1234" con un ID univoco reale dell'utente
          const userExternalId = "user_" + Date.now(); // Esempio di ID univoco
          await OneSignal.login(userExternalId);
          
          console.log("Login effettuato con ID:", userExternalId);
          
          // Ottieni informazioni sull'utente
          const user = OneSignal.User;
          console.log("Utente OneSignal:", {
            externalId: user.externalId,
            onesignalId: user.onesignalId
          });

          // Imposta il consenso per le notifiche
          OneSignal.setConsentGiven(true);
          
          // Verifica se le notifiche sono supportate
          if (OneSignal.Notifications?.permission) {
            console.log("Permessi notifiche:", OneSignal.Notifications.permission);
            
            // Se non sono già concessi, mostra il prompt
            if (OneSignal.Notifications.permission) {
              // Mostra il slidedown per richiedere il permesso
              if (OneSignal.Slidedown) {
                OneSignal.Slidedown.promptPush();
                console.log("EFFETTUATO")
              } else {
                // Fallback se Slidedown non è disponibile
                OneSignal.Notifications.requestPermission();
              }
            }
          }

        } else {
          console.error("OneSignal.User non è disponibile");
        }

      } catch (error) {
        console.error("Errore durante l'inizializzazione di OneSignal:", error);
      }
    }

    setupOneSignal();
  }, []);

  return (
    <div>
      <h1>Update3</h1>
      <DashBorad />
      <div className="home-layout">
        <Box params={boxParams} />
        <div className="form-container">
          <Form params={formParams} />
        </div>
      </div>
    </div>
  );
}

export default Home;
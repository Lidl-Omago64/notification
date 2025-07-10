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
        
        // Piccolo delay per permettere a OneSignal di completare l'inizializzazione
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
          console.log("OneSignal.Notifications:", OneSignal.Notifications);
          
          if (OneSignal.Notifications) {
            console.log("Notifications disponibili");
            
            // Verifica il permesso attuale (boolean)
            const currentPermission = OneSignal.Notifications.permission;
            console.log("Permessi notifiche (boolean):", currentPermission);
            
            // Se il permesso è false (non concesso), mostra il prompt
            if (currentPermission === false) {
              console.log("Permesso non concesso (false), mostrando prompt");
              
              // Mostra il slidedown per richiedere il permesso
              if (OneSignal.Slidedown) {
                OneSignal.Slidedown.promptPush();
                console.log("SLIDEDOWN EFFETTUATO");
              } else {
                console.log("Slidedown non disponibile, usando requestPermission");
                // Fallback se Slidedown non è disponibile
                OneSignal.Notifications.requestPermission();
                console.log("REQUEST PERMISSION EFFETTUATO");
              }
            } else if (currentPermission === true) {
              console.log("Permesso già concesso (true)");
            } else {
              console.log("Permesso in stato indeterminato:", currentPermission);
              // Prova comunque a mostrare il prompt
              if (OneSignal.Slidedown) {
                OneSignal.Slidedown.promptPush();
                console.log("SLIDEDOWN EFFETTUATO (stato indeterminato)");
              }
            }
          } else {
            console.log("OneSignal.Notifications non disponibile");
            
            // Prova comunque con il Slidedown
            if (OneSignal.Slidedown) {
              console.log("Tentativo con Slidedown diretto");
              OneSignal.Slidedown.promptPush();
            } else {
              console.log("Nessun metodo di prompt disponibile");
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
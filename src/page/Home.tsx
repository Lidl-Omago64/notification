import { useState } from "react";
import useUrlParams from "../hooks/userUrlParams";
import DashBorad from "../components/DashBoard";
import Box from "../components/Box";
import Form from "../components/Form";
import "./Home.css";
import Logo from "../assets/energyCo-2xlogo.png"

function Home() {
  const params = useUrlParams();
  const [permessoNotifiche, setPermessoNotifiche] = useState(Notification.permission);

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


  const inviaNotifica = () => {
    if (Notification.permission === "granted") {
      new Notification("Test manuale", {
        body: "Questa è una notifica di test.",
        icon: "/logo.png",
      });
    } else {
      alert("Le notifiche non sono attive.");
    }
  };

  return (
    <div>
      <DashBorad />
      <div className="home-layout">
        <Box params={boxParams} />
        <div className="form-container">
          <Form params={formParams} />
        </div>
      </div>


      {/* Pulsante per inviarne una manuale */}
      <button onClick={inviaNotifica}>
        Invia Notifica
      </button>
    </div>
  );
}

export default Home;

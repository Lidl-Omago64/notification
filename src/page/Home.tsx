import { useEffect } from "react";
import useUrlParams from "../hooks/userUrlParams";
import DashBorad from "../components/DashBoard";
import Box from "../components/Box";
import Form from "../components/Form";
import "./Home.css";
<script src="https://js.pusher.com/beams/2.1.0/push-notifications-cdn.js"></script>
import PushNotifications from "@pusher/push-notifications-web";

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
    const beamsClient = new PushNotifications.Client({
      instanceId: "058a6cdc218b04d75b72", // <--- inserisci qui il tuo Instance ID Pusher Beams
    });

    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest("general")) // sottoscrive a interesse "general"
      .then(() => console.log("Iscritto a notifiche 'general'"))
      .catch(console.error);
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

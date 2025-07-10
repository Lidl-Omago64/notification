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
      OneSignal.init({
      appId: "88084c21-94ef-4961-ba68-e65bbac74973",
      safari_web_id: "web.onesignal.auto.0860f031-816f-4b4e-9724-08fcd0b320db",
      allowLocalhostAsSecureOrigin: true,
    });
  
  }, [])


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


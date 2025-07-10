import { useEffect } from "react";
import useUrlParams from "../hooks/userUrlParams";
import DashBorad from "../components/DashBoard";
import Box from "../components/Box";
import Form from "../components/Form";
import "./Home.css";
import OneSignal from "react-onesignal";
import OneSignalDeferred from "react-onesignal"

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
    console.log(OneSignal.Slidedown)
    setupOneSignal();
    async function setupOneSignal() {
      OneSignal.init({
      appId: "9aae352d-573e-4ab8-8838-4c645fcb902b",
      safari_web_id: "web.onesignal.auto.4bf12d4e-2e1c-4e2f-be7e-e4e315c9ca64",
    });

   console.log(OneSignal.login);
    
    
    }
  }, [])


  return (
    <div>
      <h1>Update2</h1>
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


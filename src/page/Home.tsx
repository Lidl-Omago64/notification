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
      appId: "12ea929c-7efe-499e-b660-761a1ba30100",
      safari_web_id: "web.onesignal.auto.1bb493cc-6f2b-4253-90e1-02d85a4b9e78",
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


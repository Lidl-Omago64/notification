import Attenzione from "../assets/1187737.png"
import Guadagno from "../assets/7518799.png"
import Errore from "../assets/4063871.png"
import InfoBox from "./InfoBox";
import Font from "react-font";
import { useState,useEffect } from "react";
import "./Box.css"
function Box({ params }: any) {
    const [img, setImg] = useState<any>(Attenzione)
    const [title, setTitle] = useState("Attenzione")
    const [subTitle, setSubTitle] = useState("Consumo Elevato")

    useEffect(() => {

        console.log(typeof params.consumo, typeof params.immessa)
        if(Number(params.consumo) < Number(params.immessa)){
            setImg(Guadagno);
            setTitle("Guadagno")
            setSubTitle("Trigger attivo per poco tempo")
        }
        else if(params.consumo === undefined || params.immessa === undefined){
            setImg(Errore);
            setTitle("Errore")
            setSubTitle("Errore nella lettura")
        }

    }, [])
    

    return (
        <div className="box-container">
            <div className="box-header">
                <img src={img} className="box-image" />
                <div className="box-text-group">
                    <Font family="Inter">
                        <p className="box-title">{title}</p>
                        <p className="box-subtitle">{subTitle}</p>
                    </Font>
                </div>

            </div>
            <div className="box-body">
                <InfoBox color={"#183A5E"} par={params.consumo} />
                <InfoBox color={"#58BEB9"} par={params.immessa} />
            </div>
        </div>
    )

}

export default Box;
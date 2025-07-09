import "./InfoBox.css";

function InfoBox({ par, color }:any) {
  return (
    <div className="infobox-container">
      <div className="infobox" style={{ backgroundColor: color }}>
        <p className="label">Consumo</p>
        <p className="value">{par}</p>
        <p className="unit">Kw</p>
      </div>
    </div>
  );
}

export default InfoBox;
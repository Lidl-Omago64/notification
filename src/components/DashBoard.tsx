import Logo from "../assets/energyCo-2xlogo.png"

function DashBorad() {
    return (
        <div style={{
            height: "100%",
            maxHeight: "200px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem"
        }}>
            <div style={{ flex: "0 0 30%", justifyContent:"flex-start" }}>
                <img 
                    src={Logo} 
                    alt="Logo" 
                    style={{ width: "100%", height: "auto", maxHeight:"150px", objectFit: "contain" }} 
                />
            </div>
        </div>
    )
}

export default DashBorad

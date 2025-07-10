import TextLabel from './TextLabel'

function Form({params}:any) {

  /* comparazione tra due stringhe, ma comunque va bene perche tanto è  xxxKw yyyKw, quindi nessun problema*/
  const isPotenza = params.potenza_trigger > params.potenza_attuale;

  return (
    <div>
        <TextLabel triggerName={"Potenza Trigger"} value={params.potenza_trigger + " Kw"} colorRed={isPotenza}/>
        <TextLabel triggerName={"Data Trigger"} value={params.data + " "}/>
        <TextLabel triggerName={"Potenza Attuale"} value={params.potenza_attuale + " Kw"}/>
        <TextLabel triggerName={"Durata Trigger"} value={params.durata + " secondi"}/>
    </div>
  )
}

export default Form
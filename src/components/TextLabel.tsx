import Font from 'react-font'
import "./TextLabel.css"
function TextLabel({value, triggerName, colorRed}:any) {
  return (
    <div>
        <Font family="inter">
            <p className='trigger-name'>{triggerName}</p>
            <div className='box' style={{borderColor: colorRed ? "#DB2B2B" : "#e0e0e0"}}> 
                <p style={{color: colorRed ? "#DB2B2B" : 'black'}}>{value}</p>
            </div> 

        </Font>
    </div>
  )
}

export default TextLabel
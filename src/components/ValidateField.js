import {bandDef} from "../constants.js";
import attention from "../assets/attention.svg";
import "./popUp.css";
import "./inputBar.css";

export function validateInput(obj, flag, setFlag){

    let val = false;


    switch(obj.type){

        case "Callsign":
            if (obj.value.length === 0) {
                val = true;
            }
            break;

        case "Freq":
            val = true;

            bandDef.map((defs) => {
                if ((parseFloat(obj.value) >= defs.low) && (parseFloat(obj.value) <= defs.high)){
                    val = false;
                }
                
            } );
            break;
            
        default:
            val = false;
    }

    
    setFlag({...flag, [obj.type]: val});
}

function ValidateField({message, style, value, setValue, type, error, setError, initValue, restore, refrence, exp}){

    return(
        <div className="fieldContainer">
            <input
                className={style}
                ref={refrence}
                type="text" placeholder={type}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value.replace(exp, ""));
                    validateInput({type: type, value: e.target.value}, error, setError);
                }}
                onBlur={(e) => {
                    validateInput({type: type, value: e.target.value}, error, setError);
                }}
                onKeyDown={(e) => {if (restore) restore(e, setValue, initValue)}}
            />

            <div className="errorPopUp" style={{display: error[type] ? "flex" : "none"}}>
                <img className="errorImg" src={attention} alt="Exclaimation Mark" />
                <p className="errorText">{message}</p>
            </div>
        </div>
    );
}

export default ValidateField;
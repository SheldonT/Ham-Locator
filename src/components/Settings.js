import { useState } from 'react';
import gear from "../assets/gear.png";
import "./settings.css";
import "./popUp.css";


function Settings({optionalFields, setOptionalFields}) {

    const [openSettings, setOpenSettings] = useState(false);

    const SettingsContent = () => {

        return(
            <div className="popUpMenu">
                <h4 className="settingsHead">Show Optional Fields</h4>
                <div className="settingsEl">
                    <input type="checkbox" id="name" name="name" defaultChecked={optionalFields.name} onClick={(e) => setOptionalFields(Object.assign({}, optionalFields, {name: e.target.checked}))} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="settingsEl">
                    <input type="checkbox" id="grid" name="grid" defaultChecked={optionalFields.grid} onClick={(e) => setOptionalFields(Object.assign({}, optionalFields, {grid: e.target.checked}))} />
                    <label htmlFor="grid">Grid</label>
                </div>
                <div className="settingsEl">
                    <input type="checkbox" id="serialSent" name="serialSent" defaultChecked={optionalFields.serialSent} onClick={(e) => setOptionalFields(Object.assign({}, optionalFields, {serialSent: e.target.checked}))} />
                    <label htmlFor="serialSent">Serial Sent</label>
                </div>
                <div className="settingsEl">
                    <input type="checkbox" id="serialRcv" name="serialRcv" defaultChecked={optionalFields.serialRcv} onClick={(e) => setOptionalFields(Object.assign({}, optionalFields, {serialRcv: e.target.checked}))} />
                    <label htmlFor="serialRcv">Serial Received</label>
                </div>
                <div className="settingsEl">
                    <input type="checkbox" id="comment" name="comment" defaultChecked={optionalFields.comment} onClick={(e) => setOptionalFields(Object.assign({}, optionalFields, {comment: e.target.checked}))} />
                    <label htmlFor="comment">Comments</label>
                </div>

                <div className="settingsEl">
                    <button className="options" onClick={() => setOpenSettings(false)}>Done</button>
                </div>
            </div>
        );
    }

    localStorage.setItem("fields", JSON.stringify(optionalFields) );

    return(
        <div className="settings" >
            <img className="settingsIcon" onClick={() => setOpenSettings(true)} src={gear} alt="Settings Menu"/>
            {(openSettings) ? <SettingsContent /> : null}
        </div>
    );

}

export default Settings;
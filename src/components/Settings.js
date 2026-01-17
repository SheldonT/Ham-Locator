/** @format */

import React, { useState, useEffect, useContext } from "react";
import gear from "../assets/gear.png";
import useOutsideClick from "../hooks/useOutsideClick.js";
import Button from "./Button.js";
import settings from "./settings.module.css";
import PopUp from "./PopUp.js";
import SaveLog from "./SaveLog.js";
import { SettingsContext } from "../contexts/SettingsContext.js";

const Settings = React.memo(function Settings({ setHomeVis }) {
  const { optionalFields, setOptionalFields, lines, setLines } = useContext(SettingsContext);
  const [openSettings, setOpenSettings] = useState(false);

  const ref = useOutsideClick(() => setOpenSettings(false));

  return (
    <div className={settings.settings} ref={ref}>
      <img
        className={settings.settingsIcon}
        onClick={() => setOpenSettings(!openSettings)}
        src={gear}
        alt="Settings Menu"
      />
      <PopUp styleCSS={settings.menu} show={openSettings}>
        <h4 className={settings.settingsHead}>Show Optional Fields</h4>
        <div className={settings.settingsEl}>
          <input
            type="checkbox"
            id="name"
            name="name"
            defaultChecked={optionalFields && optionalFields.name}
            onClick={(e) => setOptionalFields(prev => ({ ...prev, name: e.target.checked }))}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className={settings.settingsEl}>
          <input
            type="checkbox"
            id="grid"
            name="grid"
            defaultChecked={optionalFields && optionalFields.grid}
            onClick={(e) => setOptionalFields(prev => ({ ...prev, grid: e.target.checked }))}
          />
          <label htmlFor="grid">Grid</label>
        </div>
        <div className={settings.settingsEl}>
          <input
            type="checkbox"
            id="serialSent"
            name="serialSent"
            defaultChecked={optionalFields && optionalFields.serialSent}
            onClick={(e) => setOptionalFields(prev => ({ ...prev, serialSent: e.target.checked }))}
          />
          <label htmlFor="serialSent">Serial Sent</label>
        </div>
        <div className={settings.settingsEl}>
          <input
            type="checkbox"
            id="serialRcv"
            name="serialRcv"
            defaultChecked={optionalFields && optionalFields.serialRcv}
            onClick={(e) => setOptionalFields(prev => ({ ...prev, serialRcv: e.target.checked }))}
          />
          <label htmlFor="serialRcv">Serial Received</label>
        </div>
        <div className={settings.settingsEl}>
          <input
            type="checkbox"
            id="comment"
            name="comment"
            defaultChecked={optionalFields && optionalFields.comment}
            onClick={(e) => setOptionalFields(prev => ({ ...prev, comment: e.target.checked }))}
          />
          <label htmlFor="comment">Comments</label>
        </div>
        <h4 className={settings.settingsHead}>Map Features</h4>

        <div className={settings.settingsEl}>
          <input
            type="checkbox"
            id="leadLines"
            name="leadLines"
            defaultChecked={lines}
            onClick={(e) => setLines(e.target.checked)}
          />
          <label htmlFor="leadLines">Show Lead Lines</label>
        </div>

        <div
          className={settings.settingsLink}
          onClick={() => {
            setHomeVis(true);
            setOpenSettings(false);
          }}
        >
          Change Home...
        </div>
        <h4 className={settings.settingsHead}>File</h4>
        <SaveLog>
          <div className={settings.settingsLink}>Save Log...</div>
        </SaveLog>

        {/*<div className={settings.settingsHead}>
          <Button name="Done" clickEvent={() => setOpenSettings(false)} />
        </div>*/}
      </PopUp>
    </div>
  );
});

export default Settings;

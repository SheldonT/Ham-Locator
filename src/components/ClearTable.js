/** @format */

import { useState } from "react";
import Button from "./Button.js";
import PopUp from "./PopUp.js";
import clearTable from "./clearTable.module.css";

function ClearTable({ reset, count }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <div className={clearTable.clearTable}>
      <Button
        name="Clear Table"
        clickEvent={() => setIsPopUpOpen(!isPopUpOpen)}
        disarmed={count === 0}
      />

      <PopUp styleCSS={clearTable.popUp} show={isPopUpOpen}>
        <span>Are you sure you want to clear the table?</span>
        <div className={clearTable.popUpButtons}>
          <Button
            name="Yes"
            clickEvent={() => {
              localStorage.removeItem("list");
              setIsPopUpOpen(false);
              reset();
            }}
          />
          <Button name="Cancel" clickEvent={() => setIsPopUpOpen(false)} />
        </div>
      </PopUp>
    </div>
  );
}

export default ClearTable;

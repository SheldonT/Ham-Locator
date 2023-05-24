/** @format */

function HowTo() {
  return (
    <div className="routeMain">
      <h1>How to Use Ham Locator</h1>

      <p>
        Ham Locator is very simple ham radio logging application. To add a
        contact to your log, just fill out the contact information fields and
        press enter, or click/tap the submit button. The contact information is
        entered into a table in reverse order, and saved in your browsers local
        storage, so your log won't clear if the browser is closed or refreshed.
        The location of each station in your log will be plotted on a world map.
        Clicking on any map marker or a row in the table will refocus the map
        onto that station's location and display some extra information, such as
        the station's time zone and country flag. Optional data fields, such as
        contact name, grid location, or serial numbers for contesting, can be
        added to the input bar from the settings menu.
      </p>
      <p>
        Log statistics, such as contacts per country, and contacts per band, are
        displayed graphically on the Log Stats page, and are updated in real
        time. The entire log is displayed on the Full Log page in reverse order,
        and each line can be manually updated to correct any mistakes. The
        updates are automatically saved to the log in your browser's local
        storage.
      </p>
      <p>
        To download your log, click on the "Save Log" button, select a file
        format, enter a file name, and click save. The file will be downloaded
        to your browser's Downloads folder. Your log can be saved in either ADIF
        or CSV format.
      </p>
      <p>
        Check out my{" "}
        <a
          href="https://www.loom.com/share/b920f56b108c47efb60675f31806721a"
          target="_blank"
          rel="noreferrer"
        >
          tutorial video
        </a>{" "}
        for a detailed demo.
      </p>
    </div>
  );
}

export default HowTo;

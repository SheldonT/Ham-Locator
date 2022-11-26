function HowTo() {

    return(
        <div className="routeMain">
            <h1>How to Use Ham Locator</h1>

            <p>
            Ham Locator is very simple ham radio logging application. To add a contact to your log, just fill out the contact information fields and press enter, or click/tap the submit button. The contact information is entered into a table in reverse order, and saved in your browsers local storage, so your log won't clear if the browser is closed or refreshed. The location of each station in your log will be plotted on a world map. Clicking on any map marker or a row in the table will refocus the map onto that station's location and display some extra information, such as the station's time zone and country flag.
            </p>
            <p>
            To download your log, click on the "Save Log" button, select a file format, enter a file name, and click save. The file will be downloaded to your browser's Downloads folder. Your log can be saved in either ADIF or CSV format. To clear the table and map plots, click the "Clear Table" button, and then "Yes" to confirm. Keep in mind that the data cannot be recovered.
            </p>
        </div>
    );
}

export default HowTo;

function HowTo() {

    return(
        <div className="routeMain">
            <h1>How to Use Ham Locator</h1>

            <p>
            Ham Locator is very easy to use. Just enter any ham radio callsign in the text field and press enter, or click/tap the submit button. The map will focus on the ham radio station's location, and display some extra information on the map, such as the station's time zone and country flag. The station's callsign, country, and latitude/longitude coordinates are also entered into a table in reverse order. Clicking on any map marker or a row in the table will refocus the map onto that station's location.
            </p>
            <p>
            The map plots and table information is saved in the browser's local storage, so the information won't clear if the browser tab is refreshed or closed. To clear the table and map plots, click/tap the "Clear Table" button, and then "Yes" to confirm. Keep in mind that the data cannot be recovered.
            </p>
        </div>
    );
}

export default HowTo;

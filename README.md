<!-- @format -->

<h1>Ham Locator</h1>
<a href="https://sheldont.github.io/Ham-Locator/">https://sheldont.github.io/Ham-Locator/</a>

Every ham radio operator should keep a log of all their radio contacts, and at the least, each entry should include the other station's callsign, the frequency used, the transmission mode used (AM, FM, Digital, etc.), and a standard signal report sent and received (RSTs and RSTr). Most hams use apps rather than pencil and paper to create these logs, and as a new ham, I found most of these apps to be very complicated and difficult to set up. That's why I created Ham locator, which is a simple ham radio logging app intended for new and casual operators.

<h3>Ham Locator was built using these technologies:</h3>
<ul>
  <li>React.js</li><li><a href="https://www.hamqth.com/" target="_blank">HamQTH.com</a> callbook database for retrieving callsign / station location.</li>
  <li><a href="https://github.com/YuYanDev/callsign" target="_blank">Callsign.js</a> is used as an alternative callsign search, if HamQTH.com is not available</li>
  <li><a href="https://react-leaflet.js.org/" target="_blank">React Leaflet</a> to create interactive maps</li>
  <li><a href="https://github.com/tammaroivan/react-leaflet-night-region#readme" target="_blank">react-leaflet-night-region</a> plugin for React Leaflet used to plot the night region (gray line) on the map</li>
  <li><a href="https://github.com/smucode/react-world-flags" target="_blank">react-world-flags</a> for retrieving country flag icons for each station contact.</li>
  <li><a href="https://formidable.com/open-source/victory/" target="_blank">Victory</a> for creating the bar graphs on the Stats page</li>
</ul>

<h3>Installation</h3>
<ol>
  <li>Download and install Node.js.</li>
  <li>Download the Ham Locator source code from github.com/SheldonT/Ham-Locator, or clone the repository using git. Decompress the .zip file if necessary.</li>
  <li>On a command line, navigate to the directory containing the Ham Locator source files and run <i>npm start</i>. A development server will start, and Ham Locator will start the default browser.</li>
</ol>

<h3>Usage</h3>

![hl_screenshot](https://user-images.githubusercontent.com/109766064/211208660-e414b225-ca68-4474-90d1-f1020e565dc8.png)

On initial start, you'll be prompted to enter your home information. If you're a radio amateur, enter your callsign, or enter <i>DEMO<</i> if you're just testing.

To add a record to your log, just fill in the form at the bottom of the map on the main screen with the information exchanged with your radio contact. The default fields are:

<ul>
<li>contact station's callsign,</li>
<li>contact frequency in MHz,</li>
<li>transmission mode (AM, FM, SSB, etc)</li>
<li>signal report sent (RSTs), and</li>
<li>signal report received (RSTr).</li>
</ul>
Optional fields can be added to the form from the settings menu. Available optional fields are:
<ul>
<li>contact's name,</li>
<li>Maidenhead Grid Square Locator (Grid),</li>
<li>serial sent (for radio contests), and</li>
<li>serial received (for radio contests)</li>
</ul>

After entering a record, press <i>enter</i> or click/tap the submit button. The record will be entered in a table below the map. Each consecutive record will be entered in the table in reverse order. A marker is also placed on the world map for each record at the location determined from the station's callsign. A popup is also displayed showing some extra information about the station, such as city, country, flag, and distance from your home station. All records are stored in your browser's local storage, so your log won't be lost if you refresh or close your browser.

If you're not a ham radio operator, you can still try Ham Locator by entering some log entries from my ham radio log, located under the <i>Logbook</i> tab on my <a href="https://www.qrz.com/db/VO1TWR">qrz.com profile</a>.

You can save your log in either comma seperated value, or ADIF by clicking the <i>Save Log</i> button below the log table. After selecting the format, enter a name for your log file and click save. The file will be saved to your browser's Download folder.

You can completely clear your log by clicking the <i>Clear Table</i> button. You will be prompted to confirm your choice, but be careful, because your log cannot be recovered once cleared.

The <i>Full Log</i> menu will display your entire log, and give you the option to edit any entry.

The <i>Stats</i> menu will show statistics for your current log, such as total contacts, total countries contacted, and graphs showing contacts per country, and contacts per band.

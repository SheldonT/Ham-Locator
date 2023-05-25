<!-- @format -->

<h1><a href="https://hamlocator.ca" target="_blank">Ham Locator</a></h1>
<h3>Go <a href="https://www.loom.com/share/b920f56b108c47efb60675f31806721a" target="_blank">here</a> for a brief demo video.</h3>

Every ham radio operator should keep a log of all their radio contacts, and at the least, each entry should include the other station's callsign, the frequency used, the transmission mode used (AM, FM, Digital, etc.), and a standard signal report sent and received (RSTs and RSTr). Most hams use apps rather than pencil and paper to create these logs, and as a new ham, I found most of these apps to be very complicated and difficult to set up. That's why I created Ham locator, which is a simple ham radio logging app intended for new and casual operators.

<h3>Ham Locator was built using these technologies:</h3>
<ul>
  <li>React.js</li>
  <li>Node.js</li>
  <li> <a href="https://expressjs.com/">Express.js</a> for the backend API</li>
  <li> <a href="https://www.mysql.com/">MySQL</a> for storing user information and radio logs.</lii>
  <li> <a href="https://github.com/expressjs/session>Express-Sessions</a> for managing session data</li>
  <li><a href="https://www.hamqth.com/" target="_blank">HamQTH.com</a> callbook database for retrieving callsign / station location.</li>
  <li><a href="https://github.com/YuYanDev/callsign" target="_blank">Callsign.js</a> is used as an alternative callsign search, if HamQTH.com is not available</li>
  <li><a href="https://react-leaflet.js.org/" target="_blank">React Leaflet</a> to create interactive maps</li>
  <li><a href="https://github.com/tammaroivan/react-leaflet-night-region#readme" target="_blank">react-leaflet-night-region</a> plugin for React Leaflet used to plot the night region (gray line) on the map</li>
  <li><a href="https://github.com/smucode/react-world-flags" target="_blank">react-world-flags</a> for retrieving country flag icons for each station contact.</li>
  <li><a href="https://formidable.com/open-source/victory/" target="_blank">Victory</a> for creating the bar graphs on the Stats page</li>
</ul>

<h3>Installation</h3>
At this point, not installation is required. Just visit the app at <a href="https://hamlocator.ca" >hamlocator.ca</a>.

<h3>Usage</h3>

On your initial visit, you'll need to create a user account, which can be done from the link on the loging page. You'll be asked to enter a ham radio callsign, an email address, and a password. You can also select your preferred unit of measurement to be used throughout the app, but mainly to display to the distance between your home station and a contact. There's also a field for entering a <a href="https://en.wikipedia.org/wiki/Maidenhead_Locator_System">Maidenhead Grid Square Locator</a>, but this is optional. If you're not a ham radio operator, you can click on the link at the bottom of the login field to login as a guest. After creating your account, you can login from the main login page, and you'll be brought to Ham Locator's main screen, which has a world map, a field for entering new log records (contacts), and a table for displaying recent log entries. A red pin with a home icon will be placed on the map showing your home location.

<img src="https://user-images.githubusercontent.com/109766064/214266009-b7eea0aa-97bc-4ca2-a91c-3641caa82608.png" width="75%" />

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

After entering a record, press <i>enter</i> or click/tap the submit button. The record will be entered in a table below the map. Each consecutive record will be entered in the table in reverse order. A blue marker is also placed on the world map for each record at the location determined from the station's callsign. A popup is also displayed showing some extra information about the station, such as city, country, flag, and distance from your home station. All records are stored in your browser's local storage, so your log won't be lost if you refresh or close your browser.

If you're not a ham radio operator, you can still try Ham Locator by entering some log entries from my ham radio log, located under the <i>Logbook</i> tab on my <a href="https://www.qrz.com/db/VO1TWR">qrz.com profile</a>.

You can save your log in either comma seperated value, or ADIF by clicking the <i>Save Log</i> button below the log table. After selecting the format, enter a name for your log file and click save. The file will be saved to your browser's Download folder.

You can completely clear your log by clicking the <i>Clear Table</i> button. You will be prompted to confirm your choice, but be careful, because your log cannot be recovered once cleared.

The <i>Full Log</i> menu will display your entire log, and give you the option to edit any entry.

The <i>Stats</i> menu will show statistics for your current log, such as total contacts, total countries contacted, and graphs showing contacts per country, and contacts per band.

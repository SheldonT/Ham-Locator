<h1>Ham Locator</h1>

Every ham radio operator should keep a log of all their radio contacts, and at the least, each entry should include the other station's callsign, the frequency used, the transmission mode used (AM, FM, Digital, etc.), and a standard signal report sent and recieved (RSTs and RSTr). Most hams use apps rather than pencil and paper to create these logs, and as a new ham, I found most of these apps to be very complicated and difficult to set up. That's why I created Ham locator, which is a simple ham radio logging app intended for new and casual operators.

<h3>Ham Locator was built using these technologies:</h3>
<ul>
  <li>React.js</li>
  <li><a href="https://www.hamqth.com/" target="_blank">HamQTH.com</a> callbook database for retrieving callsign / station location.</li>
  
  <li><a href="https://github.com/YuYanDev/callsign" target="_blank">Callsign.js</a> is used as an alternative callsign search, if HamQTH.com is not available</li>
  
  <li><a href="https://react-leaflet.js.org/" target="_blank">React Leaflet</a> to create interactive maps</li>

  <li><a href="https://github.com/tammaroivan/react-leaflet-night-region#readme" target="_blank">react-leaflet-night-region</a> plugin for React Leaflet used to plot     the   night region (gray line) on the map</li>
  
  <li><a href="https://github.com/smucode/react-world-flags" target="_blank">react-world-flags</a> for retrieving country flag icons for each station contact.</li>

</ul>

To add a contact to your log, just fill out the contact information fields and press enter, or click/tap the submit button. The contact information is entered into a table in reverse order, and saved in your browsers local storage, so your log won't clear if the browser is closed or refreshed. The location of each station in your log will be plotted on a world map. Clicking on any map marker or a row in the table will refocus the map onto that station's location and display some extra information, such as the station's time zone and country flag. Optional data fields, such as contact name, grid location, or serial numbers for contesting, can be added to the input bar from the settings menu.

Go <a href="https://sheldont.github.io/Ham-Locator/">here</a> to try Ham Locator. If you're not a radio amateur, enter "DEMO" into the Callsign field when prompted to enter yoru home information. For testing, you can also find some example ham radio callsigns and log entries from my qrz.com page <a href="https://www.qrz.com/db/VO1TWR">here</a>, under the Logbook tab. Any issues can be submitted under the Issues tab above.

![hl_screenshot](https://user-images.githubusercontent.com/109766064/211208660-e414b225-ca68-4474-90d1-f1020e565dc8.png)

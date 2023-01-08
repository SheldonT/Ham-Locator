/** @format */

function About() {
  return (
    <div className="routeMain">
      <h1>About Ham Locator</h1>

      <p>
        Ham Locator is a simple ham radio logging application developed mainly
        with new hams in mind. It's written in React as project for{" "}
        <a href="https://www.getcoding.ca/" target="_blank" rel="noreferrer">
          {" "}
          Get Coding
        </a>
        software development training.
      </p>
      <p>
        Ham locator uses{" "}
        <a
          href="https://react-leaflet.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          React-Leaflet
        </a>{" "}
        maps for plotting station locations, and{" "}
        <a
          href="https://github.com/tammaroivan/react-leaflet-night-region#readme"
          target="_blank"
          rel="noreferrer"
        >
          react-leaflet-night-region
        </a>{" "}
        by Ivan Tammaro to display the night region the map. The primary
        callsign search is powered by{" "}
        <a href="https://www.hamqth.com/" target="_blank" rel="noreferrer">
          hamQTH.com
        </a>
        , owned by Petr Hlozek (OK2CQR). If hamQTH is not available,{" "}
        <a
          href="https://github.com/YuYanDev/callsign"
          target="_blank"
          rel="noreferrer"
        >
          Callsign.js
        </a>{" "}
        by YuYan Yang (BG5ABL) is used as an alternative. The flag that
        accompanies the information displayed after a search is provided by{" "}
        <a
          href="https://github.com/smucode/react-world-flags"
          target="_blank"
          rel="noreferrer"
        >
          React-world-flags
        </a>
        .
      </p>
    </div>
  );
}

export default About;

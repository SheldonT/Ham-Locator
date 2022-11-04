
function About() {

    return(
        <div className="routeMain">
            <h1>About Ham Locator</h1>

            <p>
            Ham Locator is an app for gathering location information about ham radio stations around the world. It's written in React as project for <a href="https://www.getcoding.ca/">Get-Coding</a> software development training, and is intended to be used for a larger future project.
            </p>
            <p>
            Ham locator uses <a href="https://pigeon-maps.js.org/" target="_blank">Pigeon-Maps</a> for plotting station locations, and the primary callsign search is powered by <a href="https://www.hamqth.com/" target="_blank">hamQTH.com</a>. If hamQTH is not available, <a href="https://github.com/YuYanDev/callsign" target="_blank">Callsign.js</a> by YuYanDev is used as an alternative. The flag that accompanies the information displayed after a search is provided by <a href="https://github.com/smucode/react-world-flags" target="_blank">React-world-flags</a>.
            </p>
        </div>
    );
}

export default About;

import {Marker, useMap} from 'react-leaflet';
//import {Icon} from "leaflet";


function Anchor({info, selectedInfo, action, setIsOpen}) {

    const map = useMap();

    if (selectedInfo){
        map.flyTo([selectedInfo.anchor[0] - 5, selectedInfo.anchor[1]], 3);
    }

    return(
        <>
            <Marker position={info.anchor}
                eventHandlers={{
                    click: () => {
                        map.flyTo([info.anchor[0] - 5, info.anchor[1]]);
                        action(info);
                        setIsOpen(true);
                    },
                }}>
            </Marker>
        </>
    );

}

export default Anchor;

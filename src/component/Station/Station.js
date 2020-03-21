import React,{useState} from 'react';
import axios from 'axios';
import './Station.scss';

var ENDPOINT = 'https://train-station.herokuapp.com';

const Station = (props) => {
    const [trainArrived,setTrainArrived] = useState(false);

    const onClickStation = (e) => {
        e.preventDefault();
        let station = e.target.name;
        let sp = document.getElementById('Station'+station);

        axios.get(ENDPOINT+'/station/release/'+station).then((response) => {
            sp.innerHTML =JSON.stringify(response.data);
            let dest = response.data.station.dest;
            dest = 'st'+(!!dest ? '1' : '0');
            let divCurrent = document.getElementById(dest);
            divCurrent.style.backgroundColor = response.data.station.status;
            props.data(response.data);
        });   
    }

    return(
        <div className='Station'>
            <div className='eachStation zero' id='trainZero'>
                <p id='st0'>Station 0</p>
                <input type='submit' value='Station0' name='0' onClick={onClickStation}/>
                <p>MONITOR: <span id='Station0'>Station 0</span></p>
            </div>
            <div className='eachStation one' id = 'trainOne'>
                <p id='st1'>Station 1</p>
                <input type='submit' value='Station1' name='1' onClick={onClickStation}/>
                <p>MONITOR: <span id='Station1'>Station 0</span></p>
            </div>
        </div>
    );
}

export default Station;
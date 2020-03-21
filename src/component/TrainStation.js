import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Train from './Train/Train';
import Station from './Station/Station';
import './TrainStation.scss';

var ENDPOINT = 'https://train-station.herokuapp.com';

const TrainStation = () => {
    const [sendData,setSendData] = useState({});
    const [getData,setGetData] = useState({});

    useEffect(() => {
        setInterval(() => {
            console.log('3000ms');
            axios.get(ENDPOINT+'/station').then((response) => {
                let divGet = document.getElementById('getData');
                divGet.innerHTML = JSON.stringify(response.data);
            });    
        },3000);
    });

    const onClickReset = () => {
        axios.get(ENDPOINT+'/station/reset').then((response) => {
            let divGet = document.getElementById('getData');
            divGet.innerHTML = JSON.stringify(response.data);
        });
    }

    return(
        <div className='TrainStation'>
            <div id='getData'></div>
            <Train data={sendData}/>
            <Station data={e => setSendData(e)}/>
            <button onClick={onClickReset}>RESET DATA</button>
        </div>
    );
}

export default TrainStation ;
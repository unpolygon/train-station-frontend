import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Train from './Train/Train';
import Station from './Station/Station';
import './TrainStation.scss';

var ENDPOINT = 'https://train-station.herokuapp.com';

const TrainStation = () => {
    const [sendData,setSendData] = useState({});
    const [getData,setGetData] = useState('');

    async function fetchData(){
        await axios.get(ENDPOINT+'/station').then((response) => {
            let data = JSON.stringify(response.data);
            setGetData(data);
            setSendData(response.data);
        })
    }

    useEffect(() => {
        return setInterval(() => {
            fetchData();
            console.log('get Data');
        },3000);     
    },[]);

    const onClickReset = () => {
        axios.get(ENDPOINT+'/station/reset').then((response) => {
            let divGet = document.getElementById('getData');
            divGet.innerHTML = JSON.stringify(response.data);
        });
    }

    return(
        <div className='TrainStation'>
            <div id='getData'>{getData}</div>
            <Train data={sendData}/>
            <Station data={sendData}/>
            <button onClick={onClickReset}>RESET DATA</button>
        </div>
    );
}

export default TrainStation ;
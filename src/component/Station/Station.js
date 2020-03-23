import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Collapse from './Collapse/Collapse';
import './Station.scss';

var ENDPOINT = 'https://train-station.herokuapp.com';

const Station = (props) => {
    var data = props.data;

    useEffect(() => {
        if(Object.keys(data).length > 0){
            changeColor();
        }
    });

    const changeColor = () => {
        let station = data.station;
        for(let i = 0 ; i < 2; i++){
            let divStation = document.getElementById(`st${i}`);
            console.log(divStation);
            let btn = divStation.child;
            let status = station[i].status; 
            divStation.classList.remove(`green`);
            divStation.classList.remove(`yellow`);
            divStation.classList.remove(`red`);
            divStation.classList.add(`${status}`);
        }
    }

    const updateText = () => {
        let station = data.station;
    }

    const onClickStation = async (e) => {
        e.preventDefault();
        let station = e.target.name;
        await axios.get(ENDPOINT+'/station/release/'+station)
        .catch(err => console.log(err)); 
    }

    return(
        <div className='Station'>
            <div className='eachStation zero' id='st0'>
                <button name='0' onClick={onClickStation}>
                    <span>Station 0</span>
                </button>
                <p>Status: Waiting</p>
                <p>Train: Train0</p>
            </div>
            <div className='eachStation one red' id = 'st1'>
                <button name='1' onClick={onClickStation}>
                    <span>Station 1</span>
                </button>
                <p>Status: Waiting</p>
                <p>Train: Train0</p>
            </div>
        </div>
    );
}

export default Station;
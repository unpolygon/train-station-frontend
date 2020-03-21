import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './Train.scss';

var ENDPOINT = 'https://train-station.herokuapp.com';

const Train = (props) => {
    const [stationTrainZero,setStationTrainZero] = useState(1); 
    const [stationTrainOne,setStationTrainOne] = useState(0); 
    var res = props.data;

    useEffect(() => {
            if(Object.keys(res).length !== 0){
                console.log(res);
                let station = res.station.dest;
                let train = +res.station.train;
                console.log(+train);
                console.log(!!train);
                let divTrain = ( !!train ? 
                    document.getElementById('one'): 
                    document.getElementById('zero'));
                console.log(divTrain);
                if(res.station.status === 'red'){
                    divTrain.style.justifyContent='center';
                }
            }
    });

    const onClickTrain = (e) => {
        //train arrived
        let trainCurrent = parseInt(e.target.name);
        console.log('trainCurrent ',trainCurrent);

        let sp = document.getElementById('Train'+trainCurrent);
        
        axios.get(ENDPOINT+'station/arrived/'+trainCurrent)
        .then(response => {
            console.log(response);
            if(response.data.train.status !== 'error'){
                let train = response.data.train;
                console.log(train);
                let stationCurrent = response.data.station;
                let dest = stationCurrent.dest;
                let status = stationCurrent.status;
                let divTrain = ( !!+trainCurrent ? 
                    document.getElementById('one'): 
                    document.getElementById('zero'));
                if(dest === 0){
                    divTrain.style.justifyContent='flex-start';
                }else{
                    divTrain.style.justifyContent='flex-end';
                }
            }
            sp.innerHTML = JSON.stringify(response.data);
        });
    }
    
    return(
        <div className='Train'>
            <div className='zero' id='zero'>
                {/* <p>Train0 next is Station {stationTrainZero} <br /> */}
                    <span id = 'Train0'>0</span>
                {/* </p> */}
                <input type='submit' value='Train0' name='0' onClick={onClickTrain}/>
            </div>
            <div className ='one' id='one'>
                {/* <p>Train1 next Station is {stationTrainOne} <br /> */}
                    <span id = 'Train1'>1</span>
                {/* </p> */}
                <input type='submit' value='Train1' name='1' onClick={onClickTrain}/>
            </div>
        </div>
    );
}

export default Train;
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import BoxAnimation from './BoxAnimation';
import './Train.scss';

var ENDPOINT = 'https://train-station.herokuapp.com';

const Train = (props) => {
    var data = props.data;

    useEffect(() => {
        if(Object.keys(data).length > 0) insertAnimation();
    });

    const changeText = (btn,i,dest) => {
        if(dest === 0) btn.textContent = `< Train${i}`;
        if(dest === 1) btn.textContent = `Train${i} >`;
    }

    const removeClass = (btn) => {
        btn.classList.remove('forwardAnimation');
        btn.classList.remove('backwardAnimation');
        btn.classList.remove('forward');
        btn.classList.remove('backward');
    }

    const insertAnimation = () => {
        let train = data.train;
        for(let i = 0; i < 2; i++){
            let btn = document.getElementById(i);

            removeClass(btn);
            changeText(btn,i,train[i].dest);

            if(train[i].status === 'error' || train[i].status === 'going'){
                if(train[i].dest === 1){
                    btn.classList.add('forward');
                    btn.classList.add('forwardAnimation');
                }else{
                    btn.classList.add('backward');
                    btn.classList.add('backwardAnimation');
                }
            }else if(train[i].status === 'stay'){
                if(train[i].dest === 1){
                    btn.classList.add('backward');
                }else{
                    btn.classList.add('forward');
                }
            }else if(train[i].status === 'waiting'){
                if(train[i].dest === 1){
                    btn.classList.add('forward')
                }else{
                    btn.classList.add('backward')

                }
            }
        }
    }

    const onClickTrain = async (e) => {
        let trainCurrent = parseInt(e.target.id);        
        await axios.get(ENDPOINT+'/station/arrived/'+trainCurrent)
        .catch(err => console.log(err)); 
    }
    
    return(
        <div className='Train'>
            <div>
                <div className='coverButton'>
                    <button id='0' onClick={onClickTrain} className='forward'>Train0 &gt;</button>
                </div>
            </div>
            <div>
                <div className='coverButton'>
                    <button id='1' onClick={onClickTrain} className='backward'>&lt; Train1</button>
                </div>
            </div>
        </div>
    );
}

export default Train;
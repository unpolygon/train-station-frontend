import React from 'react';
import './Collapse.scss';

var x = {"station":[{"dest":0,"status":"red","train":0},{"dest":1,"status":"red","train":1}],"train":[{"dest":1,"status":"going"},{"dest":0,"status":"going"}]};
x = JSON.stringify(x);

const Collapse = () => {
    return(
        <div className='Collapse'>
            <input id="toggle" type="checkbox"/>
                <label for="toggle">
                    <span>Status</span>
                    <div className="expand">
                        <span id='status'>{x}</span>
                    </div>
                </label>
        </div>
    );
}

export default Collapse;
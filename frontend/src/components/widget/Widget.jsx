import React, { useEffect, useState } from 'react'
import "./widget.scss";

function Widget({data ,heading} ) {
  // console.log("widddddddddddddddddddddd",data);
//  console.log("cruddddddddddddddd",);
  if (data) {
    return (
      <div className='widget'>
        <h4>{heading}</h4>
        {/* Map through the data and create a widget for each item */}
        {data.map((item, index) => (
          <div key={index} className='widget-item'>
            <span className='widget-label'>{item.label}</span>
            {/* <span className='widget-value'>{item.value} %</span> */}
          </div>
        ))}

      </div>
    );
  } else {
    return (<div className='widget'>
    <h4>No data exist</h4>
  </div>
)
  }
}

export default Widget

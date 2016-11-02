import React from 'react';

const DataList = (props) => {
    if(!props.data){
      return null;
    }
    return (
      <ul>
        {props.data.map(function(datum){
          return <li>{datum.num}</li>;
        })}
      </ul>
    );
};

export default DataList;

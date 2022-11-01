import React from 'react';

const Card = ({name, image, types, attack}) => {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={image} alt="" width='200px' height='250px'/>
            <h5>{attack}</h5>
        </div>
    );
};

export default Card;
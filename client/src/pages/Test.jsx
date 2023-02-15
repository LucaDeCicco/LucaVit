import React, {useEffect, useState} from 'react';

const Test = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetcher = async () => {
            // const user = JSON.parse(localStorage.getItem('user'));
            // if (user){
            //     let token = user.token
                let request = await fetch(`http://localhost:8888/car/getAll`,{
                    // headers: {Authorization: 'Bearer ' + token}
                })
                let result = await request.json();
                setCars(result);
            // }
        };
        fetcher();
    }, [])

    return (
        <div>
            {cars.map((car, index) => {
                return (
                    <h1 key={index}>{car.brand}</h1>
                );
            })}
        </div>
    )
};

export default Test;
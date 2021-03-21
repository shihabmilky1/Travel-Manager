import React from 'react';
import Data from '../../fakedata/data';
import Home from '../Home/Home';
import Vehicles from '../Vehicles/Vehicles';

const Header = () => {
  // const Data = [{
  //   "id": 1,
  //   "image": "https://ibb.co/0sFBVJ6",
  //   "name": "Car",
  //   "price": "$80"
  // }, {
  //   "id": 2,
  //   "image": "https://ibb.co/K0xp0kn",
  //   "name": "Train",
  //   "price": "$19"
  // }, {
  //   "id": 3,
  //   "image": "https://ibb.co/ZSYNT8t",
  //   "name": "Motorcycle",
  //   "price": "$100"
  // }, {
  //   "id": 4,
  //   "image": "https://ibb.co/kVn33Nm",
  //   "name": "Bus",
  //   "price": "$30"
  // }];
return (
    <div>
   <h1>version</h1>
   {
                Data.map(dt =><Vehicles data={dt}></Vehicles>)
            }
    </div>
);
};

export default Header;
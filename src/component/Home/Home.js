import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Data from '../../fakedata/data';
import Vehicles from '../Vehicles/Vehicles';

const Home = () => {
    const [VehiclesData,setVehiclesData] = useState([]);
    useEffect(()=>{
        setVehiclesData(Data)
    },[]);
    const history = useHistory();
    const handleDestination = (name) => {
        history.push(`/destination/${name}`)
    }
    return (
        <div className="set-background">
          <div className="container">
              <div className="row mt-5 pt-5">
              {VehiclesData.map(data =><Vehicles key={data.id} handleDestination={()=>handleDestination(data.name)} data={data}></Vehicles>)}
              </div>
          </div>
        </div>
    );
};

export default Home;
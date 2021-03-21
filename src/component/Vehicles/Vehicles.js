import React from 'react';

const Vehicles = (props) => {
  const { name, image } = props.data;
  const handleDestination = props.handleDestination;
  return (
    <>
      <div className="col-lg-3 text-center p-2">
        <div onClick={handleDestination} className="card shadow h-100" style={{ border: 'none', cursor: 'pointer' }}>
          <img className="card-img-top img-fluid w-75 ml-5 p-3" src={image} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>

            <div className="card-footer d-none">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehicles;
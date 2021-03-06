import React, { useEffect, useState } from 'react';
import './Destination.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Data from '../../fakedata/data';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
const Destination = (props) => {
    const { Name } = useParams();
    const [fakeData, setFakeData] = useState([]);
    useEffect(() => {
        setFakeData(Data);
    }, [])
    const FindData = Data.find(pd => pd.name === Name)
    const inputStyle = {
        borderRadius: '0px',
        border: '0px',
        borderBottom: '1px solid #00ac96',
        color: '#495057'
    };

    const [destinations, setDestinations] = useState({
        from: '',
        pick: '',
        dateForm:'',
        dateTo:''
    })

    const [AddresSubmited, SetAddresSubmited] = useState(false)
    const handleSubmit = (e) => {
        if (destinations.from && destinations.pick) {
            SetAddresSubmited(!AddresSubmited)
        }
        else {
            toast.error('Fill The Form', {
                position: 'top-center'
            });;
        }
        e.preventDefault();
    }
    const handleDestination = (e) => {
        let isForm = true;
        if(destinations.dateForm < destinations.dateTo){
            isForm = true
        }
        if (e.target.name === 'from') {
            isForm = /^[a-zA-Z ]/.test(e.target.value);
        }
        if (e.target.name === 'pick') {
            isForm = /^[a-zA-Z ]/.test(e.target.value);

        }
        if (e.target.name === 'dateForm') {
            isForm =  /^[0-9\b]/.test(e.target.value);

        }
        if (e.target.name === 'dateTo') {
            isForm =  /^[0-9\b]/.test(e.target.value);

        }
        if (isForm) {
            const newDestination = { ...destinations };
            newDestination[e.target.name] = e.target.value;
            setDestinations(newDestination)
        }
        if (isForm === false) {
            toast.error('Input Valid Address', {
                position: 'top-center'
            });
        }
       
    }
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4">
                        {!AddresSubmited && <div className="card shadow " style={{ border: 'none' }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <label className="text-left ml-2 mt-3" htmlFor="">Pick On</label>
                                    <input type="text" onBlur={handleDestination} name="from" placeholder="Enter City" style=
                                    {inputStyle} className="form-control" />
                                    <label className="text-left ml-2 mt-3" htmlFor="">Pick On</label>
                                    <input type="text" onBlur={handleDestination} name="pick" placeholder="Enter City" style={inputStyle} className="form-control" />
                                    <label className="text-left ml-2 mt-3" htmlFor="">From</label>
                                    <input type="date" onBlur={handleDestination} name="dateForm" style={inputStyle} className="form-control" />
                                    <label className="text-left ml-2 mt-3" htmlFor="">To</label>
                                    <input type="date" onBlur={handleDestination} name="dateTo" style={inputStyle} className="form-control" />
                                    <div className="text-center mt-3">
                                    <input type="Submit" className="btn btn-outline-info" style={{ borderRadius: '0px', padding: '6px 25px' }} value='Search' />
                                    </div>
                                </form>
                            </div>
                        </div>}
                        {AddresSubmited &&
                            <div className="card shadow text-left " style={{ border: 'none' }}>
                                <div className="card-body">
                                    <div className="p-3" style={{ background: '#00AC96' }}>
                                        <div className="text-center text-white">
                                        <b><span>{destinations.dateForm}</span> - <span>{destinations.dateTo}</span></b>
                                        </div>
                                        <ul class="sessions">
                                            <li><h6>{destinations.from}</h6></li>
                                            <li><h6>{destinations.pick}</h6></li>
                                        </ul>
                                    </div>
                                    <div class="bg-light text-left d-flex justify-content-around p-3 align-items-center rounded my-2">
                                        <div className="w-25">
                                            <img className="img-fluid" src={FindData.image} alt="" />
                                        </div>
                                        <div>
                                            <h6>{FindData.name}</h6>
                                        </div>
                                        <div>
                                            <h6><FontAwesomeIcon style={{ marginRight: '2px', fontSize: '13px' }} icon={faUserFriends} />{FindData.people}</h6>
                                        </div>
                                        <div>
                                            <h6>{FindData.price}</h6>
                                        </div>
                                    </div>
                                    <div class="bg-light text-left d-flex justify-content-around p-3 align-items-center rounded my-1">
                                        <div className="w-25">
                                            <img className="img-fluid" src={FindData.image} alt="" />
                                        </div>
                                        <div>
                                            <h6>{FindData.name}</h6>
                                        </div>
                                        <div>
                                            <h6><FontAwesomeIcon style={{ marginRight: '2px', fontSize: '13px' }} icon={faUserFriends} />{FindData.people}</h6>
                                        </div>
                                        <div>
                                            <h6>{FindData.price}</h6>
                                        </div>
                                    </div>
                                    <div class="bg-light text-left d-flex justify-content-around p-3 align-items-center rounded my-2">
                                        <div className="w-25">
                                            <img className="img-fluid" src={FindData.image} alt="" />
                                        </div>
                                        <div>
                                            <h6>{FindData.name}</h6>
                                        </div>
                                        <div>
                                            <h6><FontAwesomeIcon style={{ marginRight: '2px', fontSize: '13px' }} icon={faUserFriends} />{FindData.people}</h6>
                                        </div>
                                        <div>
                                            <h6>{FindData.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className="col-md-8">
                        <img src="https://i.ibb.co/4Z6FV30/Map.png" className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Destination;
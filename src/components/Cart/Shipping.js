import React,{useState} from 'react'
import "./Shipping.css"
import {useNavigate} from "react-router-dom"
import MetaData from "../Layouts/Header/MetaData"
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country,State} from "country-state-city"
import {useDispatch,useSelector} from "react-redux"
import {ToastCallError} from "../../ReactToast"
import CheckOutSteps from './CheckOutSteps';
import {saveShippingInfo} from "../../actions/cartAction"

const Shipping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {shippingInfo} = useSelector(state=>state.cart);


    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e)=>{
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length > 10){
            ToastCallError("Phone Number is not correct");
            return;
        }

        dispatch(saveShippingInfo({
            address,city,state,country,pinCode,phoneNo
        }));
        navigate("/order/confirm")
    }


  return (
    <> 
    <MetaData title="Shipping Details" />
    <CheckOutSteps activeStep = {1} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>


                <form onSubmit={shippingSubmit} action="" className="shippingForm" encType='multipart/form-data'>

                    <div>
                        <HomeIcon />
                        <input type="text" placeholder = "address" required value = {address} onChange={(e)=> setAddress(e.target.value)} />
                    </div>
                    <div>
                        <LocationCityIcon />
                        <input type="text" placeholder = "City" required value = {city} onChange={(e)=> setCity(e.target.value)} />
                    </div>
                    <div>
                        <PinDropIcon />
                        <input type="number" placeholder = "Pin Code" required value = {pinCode} onChange={(e)=> setPinCode(e.target.value)} />
                    </div>
                    <div>
                        <PhoneIcon />
                        <input type="number" placeholder = "Phone Number" required value = {phoneNo} onChange={(e)=> setPhoneNo(e.target.value)} size="10" />
                    </div>
                    <div className='country'>
                        <PublicIcon />
                        <select required value = {country} onChange={(e)=> setCountry(e.target.value)} >
                            <option value=""> Country </option>
                            {Country && Country.getAllCountries().map((item)=>(<option key={item.isoCode} value={item.isoCode}>{item.name}</option>)
                            )} 
                        </select>
                    </div>

                    {country && (
                        <div className='state'>
                            <TransferWithinAStationIcon />
                            <select required value={state} onChange={(e)=>setState(e.target.value)}>
                                <option value=""> State </option>
                                {State && State.getStatesOfCountry(country).map((item)=> {
                                    return <option value={item.isoCode} key={item.isoCode} >{item.name}</option>
                                })}
                            </select>
                        </div>
                    )}

                    <input type="submit" value="Continue" className="shippingBtn" disabled =  {state ? false:true} />
                </form>
            </div>
        </div>
    </>
  )
}

export default Shipping
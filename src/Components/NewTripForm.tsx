import { Outlet, Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from 'react';

const token = localStorage.getItem("token");

const myHeaders = new Headers();
myHeaders.append("authorization", token!);
myHeaders.append("Content-Type", "application/json");

const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: '',
    redirect: 'follow'
};


function NewTripForm() {

    const [tripData, setTripData] = useState({
        name: "",
        destination: "",
        startDate: "",
        endDate: "",
        description: "",
        price: 0,
        image: "",
        activities: [],
        id: "",
    });

    const handleInputChange = (e:ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setTripData({
            ...tripData,
            [name]: value,
        });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     requestOptions.body = JSON.stringify(tripData)
        

        // Make the POST request here
        fetch("http://localhost:3000/api/trips", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Server Response:", result);
                // Handle the server response as needed
            })
            .catch(error => {
                console.log('Error:', error);
                // Handle errors
            });
    };

    return (
        <>
            <h1>new trip</h1>
            <Link to='/trips'><button>all trips</button></Link>

            <Outlet />

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" >name:</label>
                    <input type="text" name="name" autoComplete="given-name" value={tripData.name} onChange={handleInputChange} id="name" />
                </div>
                <div>
                    <label htmlFor="destination" >destination:</label>
                    <input type="text" name="destination" autoComplete="off" value={tripData.destination} onChange={handleInputChange} id="destination"  />
                </div>
                <div>
                    <label htmlFor="startDate">startDate:</label>
                    <input type="text" name="startDate" autoComplete="off" value={tripData.startDate} onChange={handleInputChange}id="startDate" />
                </div>
                <div>
                    <label htmlFor="endDate">endDate:</label>
                    <input type="text" name="endDate" autoComplete="off" value={tripData.endDate} onChange={handleInputChange} id="endDate"/>
                </div>
                <div>
                    <label htmlFor="description" >description:</label>
                    <textarea name="description" autoComplete="off" value={tripData.description} onChange={handleInputChange} id="description" />
                </div>
                <div>
                    <label htmlFor="price">price:</label>
                    <input type="number" name="price" autoComplete="off" value={tripData.price} onChange={handleInputChange}id="price" />
                </div>
                <div>
                    <label htmlFor="image">image:</label>
                    <input type="text" name="image" autoComplete="off" value={tripData.image} onChange={handleInputChange} id="image"/>
                </div>
                <div>
                    <label htmlFor="activities">activities:</label>
                    <input type="text" name="activities" autoComplete="off" value={tripData.activities} onChange={handleInputChange} id="activities"/>
                </div>
                <div>
                    <label htmlFor="id">id:</label>
                    <input type="text" name="id" autoComplete="off" value={tripData.id} onChange={handleInputChange}id="id" />
                </div>
                <button type="submit">send</button>
            </form>
        </>
    )
}

export default NewTripForm;

import { Outlet, Link, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useEffect } from "react";
import { Trip } from "./AllTrips";

const token = localStorage.getItem("token");

// סינטקס עריכה
const myHeaders = new Headers();
myHeaders.append("authorization", token!);
myHeaders.append("Content-Type", "application/json");

//  הבאת מידע לפי תז
async function getData(id: string) {
    const response = await fetch(`http://localhost:3000/api/trips/${id}`)
    const data = await response.json()
    return data
}

function UpdateTripForm() {

    const { id } = useParams()
    const form = useForm<Trip>();
    const { register, handleSubmit } = form;

    // מימוש מידע לפי תז
    useEffect(() => {
        getData(id!).then((res) => {
            form.reset(res)
            console.log(res);
        })
    }, [id,form])

    // // שליחת בקשת עריכה לפי תז בכפתור שליחה
    const onSubmit = (trip:Trip) => {
        fetch(`http://localhost:3000/api/trips/${id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(trip),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <h1>Update Trip Form</h1>
            <Link to='/trips'><button>All Trips</button></Link>
            <Outlet />

            <form onSubmit={handleSubmit(onSubmit)} >

                <input {...register("name")} />
                <br />
                <input {...register("destination")} />
                <br />
                <input {...register("startDate")} />
                <br />
                <input {...register("endDate")} />
                <br />
                <input {...register("price")} />
                <br />
                <input {...register("image")} />
                <br />
                <input {...register("activities")} />
                <br />
                <input {...register("id")} />
                <br />

                <button onClick={()=>history.back()}type="submit">send</button>
            </form>
        </>
    )
}

export default UpdateTripForm
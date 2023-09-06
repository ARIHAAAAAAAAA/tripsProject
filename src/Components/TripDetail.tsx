import { Outlet, Link, useParams } from "react-router-dom";
import { Trip } from "./AllTrips";
import { useEffect, useState } from "react"



function TripDetail() {

    const { id } = useParams()

    async function getData(id: string | undefined) {
        const response = await fetch(`http://localhost:3000/api/trips/${id}`)
        const data = await response.json()
        return data
    }

    const [trip, setTrip] = useState<Trip | null>(null)

    useEffect(() => {
        getData(id).then((res) => {
            setTrip(res)
        })
    }, [id])

    return (
        <>
            <h1>TripDetail</h1>
            <Link to='/trips'><button>All Trips</button> </Link>

            <Outlet />
            <div id="cardDetail">
                <h2>{trip?.name}</h2>
                <p>Destination: {trip?.destination}</p>
                <p>startDate:{trip?.startDate}</p>
                <p>endDate:{trip?.endDate} </p>
                <p>description: {trip?.description}</p>
                <p>price: {trip?.price}</p>
                <p>activities:{`${trip?.activities[0]} ${trip?.activities[1]} ${trip?.activities[2]}`} </p>
                <p>id: {trip?.id}</p>
                <img src={trip?.image} width={150} height={150} />

            </div>
        </>
    )
}

export default TripDetail
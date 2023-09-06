import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react"


// ייבוא כל המידע
async function getData() {
  const response = await fetch('http://localhost:3000/api/trips')
  const data = await response.json()
  return data
}

// סינטקס למחיקה
const myHeaders = new Headers();
myHeaders.append("authorization", "test-token");
myHeaders.append("Content-Type", "application/json");

const requestOptions: RequestInit = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

// type 
export interface Trip {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
  id: string;
}
// קומפוננטה
function AllTrips() {



  // מחיקה
  function remove(id: string) {
    fetch(`http://localhost:3000/api/trips/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        location.reload();
      })
      .catch(error => console.log('error', error));
  }
  // מחזיק את המידע
  const [trips, setTrips] = useState<Trip[]>()

  useEffect(() => {
    getData().then((res) => {
      setTrips(res)

    })
  }, [])


  return (
    <>
      <h1>AllTrips</h1>


      <Link to="/"> <button>Home</button></Link>
      <br />
      <Link to="/newTrip"><button>New Trip Form</button> </Link>

      <Outlet />
      <div id="cards" >
        {/* בונה כרטיסים עם מידע */}
        {trips?.map((trip) => (
          <div id="card" key={trip.id}>
            <h2>{trip.name}</h2>
            <p>Destination: {trip.destination}</p>
            <img src={trip.image} width={150} height={150} />
            {/* מראה עוד פרטים בקומפוננטת מידע */}
            <Link to={(`/TripDetail/${trip.id}`)}><button>more details</button></Link>
            {/* הפעלת מחיקה */}
            {localStorage.getItem('token') ?
              <>
                <button onClick={() => remove(trip.id)}
                >delete</button>
                <Link to={(`/upDate/${trip.id}`)}><button>upDate</button></Link>
              </>
              : <><button>delete</button>
                <button>update</button>
              </>}
          </div>
        ))}
      </div>
    </>
  )
}

export default AllTrips


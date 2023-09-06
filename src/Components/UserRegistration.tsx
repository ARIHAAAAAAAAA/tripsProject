import { Outlet, Link } from "react-router-dom";
import { useForm } from 'react-hook-form'

type User = {
    email: string
    password: string
}

const token = localStorage.getItem("token");

const myHeaders = new Headers();

    myHeaders.append("authorization", token!);
    myHeaders.append("Content-Type", "application/json");



function UserRegistration() {

    const form = useForm<User>();
    const { register, handleSubmit } = form;

    // // שליחת בקשת עריכה לפי תז בכפתור שליחה
    const onSubmit = (user:User) => {
        fetch("http://localhost:3000/api/auth/register", {
            method: 'POST',
            // 
            headers: myHeaders,
            body: JSON.stringify(user),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <>

            <h1>User Registration</h1>
            <Link to="/"><button>Home</button></Link>
            <Outlet />
            <form onSubmit={handleSubmit(onSubmit)} >
                <label>email: </label>
                <input {...register("email")} />
                <br />
                <label >password: </label>
                <input {...register("password")} />
                <br />
                <button onClick={()=>history.back()} type="submit">send</button>
            </form>
        </>
    )
}

export default UserRegistration
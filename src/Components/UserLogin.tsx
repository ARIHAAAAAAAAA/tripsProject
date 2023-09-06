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

function UserLogin() {

    const form = useForm<User>();
    const { register, handleSubmit } = form;

    // // שליחת כניסה בכפתור שליחה
    const onSubmit = (login:User) => {
        fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(login),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result =>{
                console.log(result.responseObj.token)
                localStorage.setItem('token',result.responseObj.token)
                console.log(result)
                
            }
            )
            .catch(error => console.log('error', error));
    }

    return (
        <>

            <h1> User Login</h1>
            <Link to="/"><button>Home</button></Link>
            <Outlet />
            <form onSubmit={handleSubmit(onSubmit)} >
                <label>email: </label>
                <input {...register("email")} />
                <br />
                <label >password: </label>
                <input {...register("password")} />
                <br />
                <button type="submit">send</button>
            </form>
        </>
    )
}

export default UserLogin




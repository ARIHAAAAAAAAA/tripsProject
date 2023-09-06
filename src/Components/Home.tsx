import { Outlet, Link } from "react-router-dom";


function Home() {


    function out() {
        localStorage.removeItem('token')
        alert('You went out successfully')
    }
    
        return (
            <>
                <h1>Home Page</h1>

                <nav>
                {localStorage.getItem('token') ?
                    <Link to="/trips"><button>All Trips</button ></Link>:<><button onClick={()=>alert('you need a token')}>All Trips</button></>}
                    <br />
                    <Link to="/login"><button>User Login</button> </Link>
                    <br />
                    <Link to="/register"><button>User Registration</button> </Link>
                    <br />
                    <button onClick={out}>log out</button>
                </nav>

                <Outlet />
            </>
        )
}

export default Home
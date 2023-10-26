import { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import reactLogo from ' ./assets/react.svg'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import ItemCard from '../../components/itemcard.jsx';
import '../App.css';


function ShowItem() {
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");
  const username = sessionStorage.getItem("username");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [SignIn, setShowButton] = useState(true);

  function toCart() {
    if (idUser) {
      navigate("/cart")
    }
    else {
      navigate("/login")
    }

  }

  function logout() {
    sessionStorage.removeItem('idUser');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
    navigate("/login")
  }

  useEffect(() => {
    getCart();
    if (idUser) {
      setButtonDisabled(true)
    }
    else {
      setButtonDisabled(false);
    }
    console.log("log")
  }, []);

  const getCart = () => {
    Axios.get('http://localhost:3000/getItem').then((res) => {
      setCartItem(res.data);
      console.log(res.data);
    }
    ).catch((error) => {
      console.log(error.toJSON());
    });;

    if (cartItem.length === 0) {

    }
  }
  return (
    <>
      <section className="bg-white w-full h-full">
        <div className="p-3 w-full flex justify-end items-center">
          <div className='m-3'>
            <h2 className="text-xl text-black font-semibold ">{username}</h2>
          </div>
          <div className="m-3">
            {!idUser &&
              <button type="button" onClick={() => { navigate("/login") }}
                className="text-2xl w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in</button>
            }

          </div>
          <div className="m-3">
            {idUser &&
              <button type="button" onClick={() => { logout() }}
                className="text-2xl w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                log out</button>
            }

          </div>
        </div>


        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="p-3 w-full flex justify-center">
                <h1 className="text-black text-3xl font-bold underline">
                    Products !
                </h1>
            </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {cartItem.length > 0 ? cartItem.map((data) => {
              return (
                <ItemCard val={data} key={data.idProduct} />
              )

            }) : 'Products not available'}



          </div>
        </div>
        <div className=" w-full grid justify-items-center">
          <div className="m-5 w-1/6">
            <button type="button" onClick={() => { toCart() }}
              className="w-full text-4xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-center rounded-lg px-5 py-2.5 align-middle  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">cart</button>
          </div>
        </div>
      </section>


    </>
  )
}

export default ShowItem

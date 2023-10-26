import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import BoxItem from './Box';
// import { withAlert } from 'react-alert'

function CartPage() {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const username = sessionStorage.getItem("username");
    const [myCart, setMyCart] = useState([]);

    // const [change, setChange] = useState(false);
    async function fetchData() {
        try {
            let response = await fetch('http://localhost:3000/getcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "idUser": idUser }),
            });
            let resData = await response.json();
            setMyCart(await resData);
            console.log('myCart updated:', myCart);
        } catch (error) {
            console.log("error getting Cart")
            console.log(error)
        }
    }
    async function buyItem() {
        try {
            let response = await fetch('http://localhost:3000/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "idUser": idUser }),
            });
            let resData = await response.json();
            if (resData.length === 0) {
                alert("Done")
                window.location.reload(false);
            }
            else {
                let text = "Not enough quantity : "
                console.log(resData)
                resData.forEach((item) => {
                    text += item.ProductName
                    text += " , "
                })
                alert(text)
            }
        } catch (error) {
            console.log("error getting Cart")
            console.log(error)
        }
    }



    useEffect(() => {
        fetchData();
        if (idUser === null) {
            navigate("/login");
        }
    }, []); // Added idUser as a dependency

    // useEffect(() => {
    //     // This will run every time myCart changes
    //     if (myCart !== null) {
    //         console.log(myCart);
    //     }
    // }, [myCart]);

    return (

        <div className="h-auto min-h-full w-full ">
            <div className="p-3 w-full flex justify-end items-center">
                <div className="p-3 w-full flex items-center justify-end">
                        <div className='m-5 text-center'>
                            <h2 className="text-xl text-black font-semibold mb-2">{username}</h2>
                        </div>
                        <button className="m-5 lg:text-3xl md:text-lg font-medium text-center	bg-blue-600	 hover:bg-blue-400	 text-white inline-block align-top p-5 rounded-full shadow-xl"
                            onClick={() => navigate(-1)}>
                            Back !
                        </button>
                </div>
            </div>


            <div className="p-3 w-full flex justify-center">
                <h1 className="text-black text-3xl font-bold underline">
                    My Cart !
                </h1>
            </div>
            {
                (myCart.length === 0) && <div className="p-3 w-full  grid grid-cols-1 content-center justify-items-center	">
                    <p className="text-slate-500 text-3xl  ">
                        You have no products in your cart.
                    </p>
                    <br /><br />
                    <p className="text-slate-500 text-3xl  ">
                        Please go back and buy.
                    </p>
                </div>
            }
            <div className="container flex flex-col items-center gap-16 p-10">

                <div className='grid w-full justify-center grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {myCart.map((item, index) => {
                        return (
                            <BoxItem key={index} prop={item} />
                        )
                    })}
                </div>
            </div>
            <div className="p-3 w-full flex justify-center">
                <div className="m-3">
                    {myCart.length !== 0 &&
                        <button className="m-5 inline-block align-top lg:text-3xl md:text-lg	bg-orange-400	 hover:bg-orange-600	 text-white  py-2 px-4 rounded-full shadow-xl"
                            onClick={() => buyItem()}>
                            buy all !
                        </button>
                    }

                </div>
            </div>

        </div>
    )
}

export default CartPage;

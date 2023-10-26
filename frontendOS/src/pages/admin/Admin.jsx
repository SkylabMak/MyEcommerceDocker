import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import BoxItem from './Box';
// import { withAlert } from 'react-alert'

function AdminPage() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [remaining, setRemaining] = useState('');
    const idUser = sessionStorage.getItem("idUser");
    const role = sessionStorage.getItem("role");
    const [myItem, setMyItem] = useState([]);

    // const [change, setChange] = useState(false);

    async function fetchData() {
        try {
            let response = await fetch('http://localhost:3000/getItem/idUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "idUser": idUser }),
            });
            let resData = await response.json();
            setMyItem(await resData);
        } catch (error) {
            console.log("error getting Cart")
            console.log(error)
        }
    }
    async function addProduct() {
        try {
            const data = {
                "idUser": 1,
                "ProductName": productName,
                "Description": description,
                "price": parseInt(price),
                "remaining": parseInt(remaining)
            }
            let response = await fetch('http://localhost:3000/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let resData = await response.json();
            if (resData.success === true) {
                alert("Done")
            }
            else {
                alert("error")
            }
        } catch (error) {
            console.log("error getting Cart")
            console.log(error)
        }
    }

    function logout() {
        sessionStorage.removeItem('idUser');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        navigate("/login")
    }


    useEffect(() => {
        fetchData();
        if (idUser === null) {
            navigate("/login");
        }
        else if (role !== "seller") {
            // console.log(role)
            navigate(-1);
        }
    }, []); // Added idUser as a dependency

    useEffect(() => {
        // This will run every time myItem changes
        if (myItem !== null) {
            console.log(myItem);
        }
    }, [myItem]);

    return (

        <div className="h-auto min-h-full w-auto ">
            <div className="text-right">
                <button className="m-5 text-xl	bg-white hover:bg-slate-300	 text-black font-bold py-2 px-4 rounded-full shadow-xl"
                    onClick={() => logout()}>
                    log out !
                </button>
            </div>
            <div className="w-full flex justify-center items-center">
                <form className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                product Name
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                onChange={(e) => { setProductName(e.target.value) }}
                                defaultValue={productName}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Description
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                onChange={(e) => { setDescription(e.target.value) }}
                                defaultValue={description}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                price
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                onChange={(e) => { setPrice(e.target.value) }}
                                defaultValue={price}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                quantity
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                onChange={(e) => { setRemaining(e.target.value) }}
                                defaultValue={remaining}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button
                                onClick={() => addProduct()}
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                add new
                            </button>
                        </div>
                    </div>
                </form>
            </div>


            <div className="mt-10 w-full flex justify-center items-center">
                <h1 className="text-black text-3xl font-bold underline">
                    My Item !
                </h1>
            </div>
            <div className="container flex flex-col items-center gap-16 mx-auto my-32">
                <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {myItem.map((item, index) => {
                        return (
                            <BoxItem key={index} prop={item} />
                        )
                    })}
                </div>
            </div>
            {/* <button className="m-5 text-xl	bg-white hover:bg-slate-300	 text-black font-bold py-2 px-4 rounded-full shadow-xl"
                onClick={() => buyItem()}>
                buy all !
            </button> */}
        </div>
    )
}

export default AdminPage;

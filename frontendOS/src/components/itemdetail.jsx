
import '../pages/App.css'
import { useState } from 'react';
import Axios from 'axios';

export default function ItemDetail({ val }) {
    const [qty, setQty] = useState('1');
    const [err, setError] = useState('');
    const idUser = sessionStorage.getItem("idUser");
    const handleChange = event => {

        setQty(event.target.value);

        console.log('value is:', event.target.value);
    };

    const addToCart = () => {

        if (idUser) {
            Axios.post("http://localhost:3000/addItem", {
                idUser: idUser,
                idProduct: val.idProduct,
                Quantity: qty
            })
                .then((response) => {
                    if (response.data.success === true) {
                        setError('Well.\n You can see in your cart.')
                    } else {
                        setError('No more left')
                        console.log(response.data)
                    }
                });
        } else {
            setError('You Need To Login First.')
        }

    }

    return (
        <>

            <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
                <div className="relative">
                    <img className="w-full" src="https://www.theboxcompany.com.my/wp-content/uploads/2022/08/Square-Big-Box-Malaysia.jpg" alt="Product Image" />
                    <div className='absolute top-6 left-2/4 -translate-x-2/4'>{err && <p>{<a className="text-black underline decoration-pink-500">{err}</a>}</p>}</div>

                </div>
                <div className="py-4 px-8">
                    <div className="cartName flex justify-between">
                        <h3 className="text-xl font-medium mb-2 capitalize ">{val.ProductName}</h3>
                        <span className="font-normal text-2xl ">${val.price}</span>
                    </div>


                    <p className="text-gray-600 text-sm mb-4">{val.Description}</p>

                    <hr />

                    <div className="flex items-center justify-between mt-6 mb-3">


                        <span className="text-black font-medium  text-lg mr-4">Quantity : <input type="number" className="text-2xl bg-gray-100 w-16 text-center rounded" value={qty} min='1' max={val.remaining} onChange={handleChange} required />
                            <p className="text-gray-600  font-light">{val.remaining} pieces available</p>
                        </span>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={addToCart} >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}



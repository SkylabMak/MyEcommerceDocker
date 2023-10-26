import { useEffect, useState } from 'react'
function BoxItem(prop) {
    const [text, setText] = useState('');
    console.log(prop.prop)
    const item = prop.prop
    const idUser = item.idUser
    const [quantity, setQuantity] = useState(item.remaining);
    async function refill(idProduct) {
        try {
            console.log(text)
            console.log("run")
            const data = { "idUser": idUser, "idProduct": idProduct ,"Quantity":parseInt(text)}
            console.log(data)
            let response = await fetch('http://localhost:3000/resotck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            let resData = await response.json();
            console.log(resData)
            if (resData.success === true) {
                setQuantity(quantity + parseInt(text))
                // window.location.reload(false);
            }
            else {
                setQuantity(-1)
            }


        } catch (error) {
            console.log("error getting Cart")
            console.log(error)
        }
    }

    useEffect(() => {
    }, [quantity]);

    return (
        <div className="text-black flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-xl" >
            <p >
                <b>ProductName </b> : {item.ProductName}
            </p>
            <p>
                <b>Descriptio : </b> :{item.Description}
            </p>
            <p>
                <b>price : </b> :{item.price}
            </p>
            <p>
                <b>Quantity : </b>{quantity}
            </p>
            <input 
                                className='bg-slate-300 hover:bg-slate-400	 text-black '
                                placeholder="Add amount"
                                onChange={(e) =>{setText(e.target.value)}}
                                defaultValue={text}
                            />
            <button className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-full shadow-xl"
                onClick={() => refill(item.idProduct)}>
                Add
            </button>
        </div>
    )

}
export default BoxItem;
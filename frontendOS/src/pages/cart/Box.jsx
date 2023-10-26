import { useEffect, useState } from 'react'
function BoxItem(prop) {
    console.log(prop.prop)
    const item = prop.prop
    const [quantity, setQuantity] = useState(item.Quantity);
    async function removeItem(idUser, idProduct) {
        try {
            console.log("run")
            let response = await fetch('http://localhost:3000/removeItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "idUser": idUser, "idProduct": idProduct }),
            });
            let resData = await response.json();
            console.log(resData)
            if (resData.success === true) {
                // if((quantity -1) === 0){
                //     window.location.reload(false);
                // }
                setQuantity(quantity - 1)
                
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
        <div className="w-full text-black flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-xl" >
            <div className="grid grid-cols-1">
                <img src="https://www.theboxcompany.com.my/wp-content/uploads/2022/08/Square-Big-Box-Malaysia.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center" />
            </div>
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
                <b>Quantity : </b>{quantity} <b>remaining :</b>{item.remaining}
            </p>
            <button className="bg-red-600	text-white hover:bg-red-400 font-bold py-2 px-4 rounded-full shadow-xl"
                onClick={() => removeItem(item.idUser, item.idProduct)}>
                remove 1
            </button>
        </div>
    )

}
export default BoxItem;
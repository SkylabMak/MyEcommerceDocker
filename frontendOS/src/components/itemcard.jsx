import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../pages/App.css'
import ItemDetail from './itemdetail';

export default function ItemCard({ val }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="group relative px-8 py-10 bg-white rounded-3xl shadow-xl" key={val.idProduct}>
        <div className="grid grid-cols-1">
          <img src="https://www.theboxcompany.com.my/wp-content/uploads/2022/08/Square-Big-Box-Malaysia.jpg" alt="Front of men&#039;s Basic Tee in black." className="object-cover object-center" />
        </div>
        <div className="mt-4">
          <div>
            <h3 className="text-base text-black capitalize">

              <a className=' text-black  font-semibold' onClick={() => setShowModal(true)}>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {val.ProductName}
              </a>

            </h3>
            {/* <p className="mt-1 text-sm text-gray-500">{val.remaining} pieces available</p> */}
          </div>
          <p className="text-base font-normal text-gray-900">${val.price}</p>
        </div>
      </div>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-w-fit max-h-fit  -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
               
                {/*body*/}
                  <ItemDetail val={val}/>
                {/*footer*/}
               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"  onClick={() => setShowModal(false)}></div>
        </>
      ) : null}
    </>
  )
}



import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Delete from '@material-ui/icons/Delete'




export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The list is empty</div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/CareerData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        career_data: data,
        email: userEmail,
        career_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Things you should know</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((career, index) => (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{career.name}</td>
                    <td>{career.skills}</td>
                    <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                </tr>
            ))}

          </tbody>
        </table>
        <div className="btn bg-success mt-5" onClick={handleCheckOut}>Click here to know the career path(s)</div>
      </div>
    </div>
  );
}

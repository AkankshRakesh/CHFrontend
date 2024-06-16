import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { Link } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

// Define the styles
const styles = {
  tableContainer: {
    maxHeight: '400px', // Adjust this value as needed
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  buttonContainer: {
    textAlign: 'center'
  },
  containerStyles: {
    zIndex: 1000
  }
};

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch("http://localhost:5000/api/CareerData", {
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

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        // Handle other response statuses (e.g., display an error message)
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle fetch error (e.g., display an error message)
    }
  };

  return (
    <div>
      <div className="container m-auto mt-5" style={styles.containerStyles}>
        <div className="table-responsive table-responsive-sm table-responsive-md" style={styles.tableContainer}>
          <table className="table table-hover">
            {data.length > 0 ? (<thead className="text-success fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Things you should know</th>
                <th scope="col"></th>
              </tr>
            </thead>) : ''}
            <tbody>
              {data.map((career, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{career.name}</td>
                  <td>{career.skills}</td>
                  <td>
                    <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.buttonContainer}>
          {data.length > 0 ? (
            <Link className="btn bg-success mt-4" onClick={handleCheckOut} to="/myorder">
              Click here to know the career path(s)
            </Link>
          ) : (
            <div className="m-5 w-100 text-center fs-3">The list is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}

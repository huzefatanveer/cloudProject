import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReceiptManage() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch recipients
    axios.get('https://api.example.com/recipients')
      .then(response => {
        setRecipients(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipients:', error);
      });
  }, []);

  const handleDeleteRecipient = (id) => {
    // Simulated deletion of recipient
    axios.delete(`https://api.example.com/recipients/${id}`)
      .then(response => {
        setRecipients(recipients.filter(recipient => recipient.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Recipient has been deleted.',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error('Error deleting recipient:', error);
      });
  };

  return (
    <div className="container">
      <h1>Receipt Management</h1>
      <Link to="/add" className="button">Add New Recipient</Link>
      <table className="striped-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipients.length > 0 ? (
            recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>{recipient.name}</td>
                <td>{recipient.email}</td>
                <td>
                  <Link to={`/details/${recipient.id}`} className="button muted-button">
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDeleteRecipient(recipient.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No recipients available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReceiptManage;

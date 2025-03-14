import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewdepartment.css';
import { useAuth } from './AuthContext';
import SignIn from './SignIn';
import DoctorBody from './DoctorBody';
import DeptList from './DeptList';

function ViewDepartments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const { isAuthenticated,userData } = useAuth(); // Add this inside the component
  const hospitalId = userData?.hospitalId; // Get hospital ID

   useEffect(() => {
      if (hospitalId) {
        fetchDepartments(hospitalId);
      }
    }, [hospitalId]); // Fetch departments when hospitalId is available



  const fetchDepartments = async (id) => {
     axios
       .get(`http://localhost:5000/hospital/departments/${id}`)
       .then((response) => {
         setDepartments(response.data);
       })
       .catch((error) => console.error('Error fetching departments:', error));
   };

  return (
    <div>
      {isAuthenticated ? (
        <div>
      <DoctorHeader />
      {/* <h1 id="heading" style={{marginTop:"70px"}}>View Departments</h1> */}
      <div style={{marginTop:"100px"}}></div>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="main-container">
        <div id="existing">
          <h2>Existing Departments</h2>
          <ul id="ul">
            {departments.length > 0 ? (
              departments.map((dept) => <li key={dept._id} id="li" onClick={()=>navigate('/DeptList', { state: { dept } })}>{dept.name}</li>)
            ) : (
              <p style={{textAlign:"center"}}>No departments available</p>
            )}
          </ul>
        </div>
      </div>
      <div style={{height:"62px"}}></div>
      <HomeFooter />
    </div>):(<div><SignIn /></div>)}
    <Routes>
      <Route path='/DeptList' element={<DeptList/>}/>
    </Routes>
    </div>
  );
}

export default ViewDepartments;

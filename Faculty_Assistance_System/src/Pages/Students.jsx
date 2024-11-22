import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Students.css';
import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase methods

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    const db = getDatabase();
    const studentsRef = ref(db, 'Students'); // Path to the 'Students' node in your database

    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array
        const studentList = Object.keys(data).map((key) => data[key]);
        // Sort by roll number in ascending order
        studentList.sort((a, b) => parseInt(a.RollNumber) - parseInt(b.RollNumber));
        setStudents(studentList);
      }
    });
  }, []);

  const handleListViewClick = () => {
    navigate('/studentlist');
  };

  const handleGridViewClick = () => {
    navigate('/studentgrid');
  };

  return (
    <div className="students">
      <div className="students-mid">
        <div className="header">
          <h1>Students List</h1>
          <div className="nav-buttons">
            <button className="overview-btn" onClick={handleListViewClick}>List View</button>
            <button className="download-btn" onClick={handleGridViewClick}>Grid View</button>
            <button className="manual-btn">Download</button>
          </div>
        </div>
        <div className="table">
          <table className="students-table">
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>PRN</th>
                <th>Name</th>
                <th>Division</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.RollNumber}</td>
                    <td>{student.PRN}</td>
                    <td>{student.Name}</td>
                    <td>{student.Division}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
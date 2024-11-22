import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './StudentsGrid.css';
import './Students.css';
import Navbar from '../Components/Navbar';

export default function StudentsGrid() {
  const [students, setStudents] = useState([]);
  const [filteredDivision, setFilteredDivision] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const studentsRef = ref(db, 'Students');
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentArray = Object.values(data);
        studentArray.sort((a, b) => {
          if (a.Division === b.Division) {
            return parseInt(a.RollNumber) - parseInt(b.RollNumber);
          }
          return a.Division.localeCompare(b.Division);
        });
        setStudents(studentArray);
      }
    });
  }, []);

  const handleListViewClick = () => {
    navigate('/studentlist');
  };

  const handleGridViewClick = () => {
    navigate('/studentgrid');
  };

  const handleDivisionClick = (division) => {
    setFilteredDivision(division);
  };

  const filteredStudents = students.filter(student =>
    filteredDivision === 'ALL' ? true : student.Division === filteredDivision
  );

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

      <h2 style={{ margin: "20px 0" }}>
        {filteredDivision === 'ALL' ? 'Showing All Students' : `Showing Results for ${filteredDivision}`}
      </h2>
      <div className="screen">
        {filteredStudents.map((student, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <span className="status">Regular</span>
            </div>
            <div className="card-body">
              <div className="photoAndName">
                <div className="photo">
                  <img
                    src="profile.jpg"
                    alt="Profile"
                    className="profile-pic"
                  />
                </div>
                <div className="name">{student.Name}</div>
              </div>
              <div className="position">{student.Division}</div>
              <div className="details">
                <div className="info">
                  <p>PRN: <span style={{ color: 'white' }}>{student.PRN}</span></p>
                  <p>Roll No.: <span style={{ color: 'white' }}>{student.RollNumber}</span></p>
                  <p>E-Mail: <span style={{ color: 'white' }}>{student.Email}</span></p>
                </div>
              </div>
            </div>
            <div className="footer">
              <p>Current Attendance: 95%</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

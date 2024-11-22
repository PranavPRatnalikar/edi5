import React from 'react'
import './Report.css'

export default function Report() {
  return (
    <div>
      <div className="attendance-system">
      <div className="header">
        <h1>Attendance</h1>
        <h4>27/10/2024</h4>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <h2>Total Strength</h2>
          <p>77</p>
        </div>
        <div className="stat-box">
          <h2>Present</h2>
          <p>50</p>
        </div>
        <div className="stat-box">
          <h2>Absent</h2>
          <p>27</p>
        </div>
        <div className="stat-box">
          <h2>Attendance %</h2>
          <p>69</p>
        </div>
      </div>

        <div className="options">
          <button className="option-button">Overview</button>
          <button className="option-button">Download</button>
          <button className="option-button">Manual Changes</button>
          <button className="option-button submit-button">Submit</button>
        </div>


      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>PRN</th>
              <th>Name</th>
              <th>Division</th>
              <th>Role No.</th>
              <th>Status</th>
              <th>Late</th>
              <th>% Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>12210294</td>
              <td>John Smith</td>
              <td>TY-CSE(AI)-A</td>
              <td>1</td>
              <td><span className="status present">Present</span></td>
              <td>0</td>
              <td>100%</td>
            </tr>
            {/* Add more rows as per the image */}
          </tbody>
        </table>
      </div>

      
    </div>
    </div>
  )
}

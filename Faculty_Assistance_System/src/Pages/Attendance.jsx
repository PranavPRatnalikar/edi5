import React, { useState } from "react";
import axios from "axios";
import "./Attendance.css";

function AttendancePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [attendanceResults, setAttendanceResults] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://127.0.0.1:5000/take_attendance", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAttendanceResults(response.data.attendance || []);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to mark attendance. Check the console for details.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Take Attendance</h1>
      <p className="description">
        Upload an image of your class and we'll take care of the rest.
      </p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button className="uploadButton" onClick={handleUpload}>
        📤 Upload image
      </button>
      {attendanceResults.length > 0 && (
        <div className="results">
          <h2>Attendance Results:</h2>
          <ul>
            {attendanceResults.map((result, index) => (
              <li key={index}>
                {result.name} (PRN: {result.prn}) - Confidence: {result.confidence.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;

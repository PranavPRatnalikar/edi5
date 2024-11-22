import { React, useState } from 'react';
import './AddStudent.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentDetails() {
    const [email, setEmail] = useState("");
    const [PRN, setPRN] = useState("");
    const [name, setName] = useState("");
    const [division, setDivision] = useState("");
    const [roll, setRoll] = useState("");
    const [year, setYear] = useState("");
    const [branch, setBranch] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('prn', PRN);
            formData.append('name', name);
            formData.append('division', division);
            formData.append('roll', roll);
            formData.append('year', year);
            formData.append('branch', branch);
            if (image) {
                formData.append('image', image);  // Add image to FormData
            }

            const response = await fetch('http://localhost:5000/add_student', {  // Ensure correct URL to Flask API
                method: 'POST',
                body: formData,  // Send as FormData
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Student Details Saved Successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    
                });
                navigate('/home');
            } else {
                toast.error(result.error || "Failed to save student details", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            toast.error("Error connecting to the server", {
                position: "bottom-center",
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <ToastContainer />
            <div className="rectangle">
                <div className="inner">
                    <h1>Student Details</h1>
                    <hr /><br />
                    <div className="formandimg">
                        <div>
                            <div style={{ width: "150%" }}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Full Name of the Student"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>PRN</label>
                                    <input
                                        type="number"
                                        value={PRN}
                                        onChange={(e) => setPRN(e.target.value)}
                                        placeholder="Enter PRN of the Student"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email of the Student"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Add Image</label>
                                    <input type="file" onChange={handleImageChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <div>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input
                                        type="text"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        placeholder="Enter Year of the Student"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Branch</label>
                                    <input
                                        type="text"
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        placeholder="Enter Branch of the Student"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Division</label>
                                    <input
                                        type="text"
                                        value={division}
                                        onChange={(e) => setDivision(e.target.value)}
                                        placeholder="Enter Division of the Student"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Roll Number</label>
                                    <input
                                        type="number"
                                        value={roll}
                                        onChange={(e) => setRoll(e.target.value)}
                                        placeholder="Enter Roll Number of the Student"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="submit-btn">Submit</button>
                </div>
            </div>
        </div>
    );
}

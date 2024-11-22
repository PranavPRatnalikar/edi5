from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db
import base64
import cv2
import numpy as np
import face_recognition
import dlib

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Firebase Initialization
cred = credentials.Certificate(r"credentials.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tyedi-fa18f-default-rtdb.firebaseio.com/',
})

# Dlib setup
shape_predictor_path = r"FaceNet.dat"
detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor(shape_predictor_path)

# Helper function to get known faces (face encodings) from Firebase
def get_known_faces():
    ref = db.reference("Students")
    student_data = ref.get()
    known_encodings, known_prns, known_names = [], [], []

    if student_data:
        for prn, data in student_data.items():
            if 'FaceEncoding' in data:  # Fetching face encoding from Firebase
                encoding = np.array(data['FaceEncoding'])
                known_encodings.append(encoding)
                known_prns.append(prn)
                known_names.append(data['Name'])

    return known_encodings, known_prns, known_names

# Route to add a student with face encoding
@app.route('/add_student', methods=['POST'])
def add_student():
    try:
        # Log incoming form and file data
        print("Form Data:", request.form)
        print("Files:", request.files)
        
        prn = request.form['prn']
        name = request.form['name']
        email = request.form['email']
        division = request.form['division']
        roll = request.form['roll']
        year = request.form['year']
        branch = request.form['branch']
        image = request.files.get('image')

        # Check if PRN already exists
        ref = db.reference(f"Students/{prn}")
        if ref.get():
            return jsonify({'error': 'PRN already exists!'}), 400

        # Read and process the image
        image_content = image.read()
        img_array = np.frombuffer(image_content, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Extract face encoding
        face_encoding = face_recognition.face_encodings(img)
        if not face_encoding:
            return jsonify({'error': 'No face detected in the image'}), 400

        # Store student data with face encoding
        student_data = {
            'Name': name,
            'PRN': prn,
            'Email': email,
            'Division': division,
            'RollNumber': roll,
            'Year': year,
            'Branch': branch,
            'FaceEncoding': face_encoding[0].tolist()  # Save encoding as a list
        }
        ref.set(student_data)

        return jsonify({'message': 'Student added successfully!'}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

# Route to take attendance
@app.route('/take_attendance', methods=['POST'])
def take_attendance():
    try:
        # Log request details
        print("Headers:", request.headers)
        print("Files:", request.files)
        
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        image_file = request.files['image']
        file_bytes = np.frombuffer(image_file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Proceed with known face comparison logic
        known_encodings, known_prns, known_names = get_known_faces()
        faces = detector(img, 1)
        if not faces:
            return jsonify({"error": "No faces detected in the image"}), 400

        # Build attendance result
        results = []
        for face in faces:
            shape = shape_predictor(img, face)
            aligned_face = dlib.get_face_chip(img, shape, size=256)
            face_encoding = face_recognition.face_encodings(aligned_face)[0]

            if known_encodings:
                face_distances = face_recognition.face_distance(known_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                confidence = (1 - face_distances[best_match_index]) * 100

                if confidence >= 50:
                    results.append({
                        "prn": known_prns[best_match_index],
                        "name": known_names[best_match_index],
                        "confidence": confidence
                    })

        return jsonify({"attendance": results}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)

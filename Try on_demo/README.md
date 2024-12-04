
# AR Clothing Try-On Demo

This repository contains a simple Augmented Reality (AR) Clothing Try-On demo. Users can virtually try on clothing items (like a ring or a skirt) by using their webcam. The app uses MediaPipe for pose detection and Three.js for rendering 3D models of clothing items onto the user’s body.

Features

	•	Try on clothes: Click on the “Try On” button to virtually try on clothing like a ring or a skirt.
	•	Real-time AR try-on: Clothing is placed onto the body in real-time using pose landmarks.
	•	Camera feed: Displays the webcam feed while the user tries on items.
	•	Toast Notifications: Alerts for actions like adding items to the cart or saving for later.
	•	Responsive UI: The application is designed to be mobile-friendly.

Live Demo

You can view the demo here: Live Demo

Getting Started

To run this project locally:

Prerequisites

	•	Node.js (For running a local server to serve files)
	•	A modern web browser (Chrome, Firefox, or Edge)

Installation

	1.	Clone the repository:

git clone https://github.com/Teninator/AR-demo.git
cd AR-demo


	2.	Install dependencies (if any):
For this demo, no additional npm dependencies are needed. If you are using build tools, you may install dependencies as necessary.
	3.	Run the project on a local server:
For proper access to the camera, you must serve the files over HTTP/HTTPS. You can use either Python or Node.js:
	•	Using Python (if you have Python 3 installed):

python -m http.server 8000


	•	Using Node.js (with http-server globally installed):

npm install -g http-server
http-server


After running the server, open your browser and visit:

http://localhost:8000


	4.	Camera Permissions:
Upon visiting the AR Try-On page, your browser should ask for permission to access the camera. Make sure to grant it.

Project Structure

/AR-demo
├── /assets
│   └── /models
│       └── ring_model.fbx
│       └── skirt_model.fbx
├── /css
│   └── style.css
├── /js
│   └── app.js
│   └── three.min.js
├── store.html
├── ar.html
├── index.html
└── README.md

Files

	•	store.html: Store page with product selection and the “Try On” button.
	•	ar.html: AR page for trying on selected clothing items.
	•	app.js: Main JavaScript file for handling camera feed, pose detection, 3D rendering, and button interactions.
	•	three.min.js: Minified Three.js library used for 3D rendering.
	•	style.css: Styling for the store and AR pages, including button designs and toast notifications.
	•	index.html: Optional homepage or redirect page to the store.

Features

	•	AR Clothing Try-On: After selecting an item from the store page, users can try it on in AR. The camera feed is shown with 3D clothing models placed on the body using MediaPipe landmarks.
	•	Toast Notifications: When adding items to the cart or saving them for later, toast notifications appear in the bottom-right corner of the screen.
	•	Responsive Design: The design is mobile-friendly and adapts to different screen sizes.

Built With

	•	Three.js: 3D rendering library for rendering the virtual clothing models.
	•	MediaPipe: Used for pose detection and tracking to place the clothing onto the body.
	•	FBXLoader: A loader used to import the FBX models of clothing items.

Troubleshooting

	•	Camera Permissions: Make sure your browser allows camera access. If you’re using a secure server (HTTPS), ensure that the correct permissions are granted.
	•	AR Models Not Showing: Ensure that WebGL is supported in your browser. Some older browsers may not support 3D rendering properly.
	•	AR Camera Feed Not Starting: Check for any JavaScript errors in the browser console that may indicate issues with camera access or WebGL.




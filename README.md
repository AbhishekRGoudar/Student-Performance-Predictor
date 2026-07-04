# Student Performance Predictor 🎓

An AI-powered web application that predicts student academic performance using a tuned **Random Forest Regressor** and a modern **React** frontend. 

By analyzing metrics like study hours, historical performance, sleep habits, and attendance, the machine learning model can accurately forecast a student's final score. The model is trained on a robust dataset combining real-world academic data with over 10,000 synthetic data points.

## ✨ Features

- **High-Accuracy ML Model:** Powered by Scikit-Learn's `RandomForestRegressor`, optimized using Grid Search Cross-Validation for peak accuracy (R² > 0.85).
- **FastAPI Backend:** A blazingly fast Python backend that serves the model predictions instantly.
- **Premium UI/UX:** A stunning, fully responsive frontend built with React and Tailwind CSS v4, featuring a "Dark Glassmorphism" aesthetic, cinematic backgrounds, and micro-animations.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** Python, FastAPI, Uvicorn
- **Machine Learning:** Scikit-Learn, Pandas, NumPy, Pickle

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AbhishekRGoudar/Student-Performance-Predictor.git
cd Student-Performance-Predictor
```

### 2. Setup the Backend API
Navigate to the root directory and install the Python dependencies:
```bash
pip install -r requirements.txt
```
Start the FastAPI server (runs on port 8001):
```bash
cd api
uvicorn main:app --reload --port 8001
```

### 3. Setup the Frontend
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the Vite development server:
```bash
npm run dev
```

### 4. Retraining the Model (Optional)
If you wish to retrain the machine learning model on new data, navigate to the `ml_model` directory and run the training script:
```bash
cd ml_model
python train.py
```
This will generate a new `rf_model.pkl` file and the backend will automatically reload to use it!

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import pickle
import os

# 1. Generate Synthetic Data
np.random.seed(42)
num_samples = 10000

study_hours = np.random.uniform(1, 10, num_samples)
previous_score = np.random.uniform(40, 100, num_samples)
sleep_hours = np.random.uniform(4, 10, num_samples)
attendance_percentage = np.random.uniform(50, 100, num_samples)

# Simple equation to generate the final score with some noise
# High study hours, high previous score, good sleep, and high attendance = higher score
final_score = (
    (study_hours * 2.5) +
    (previous_score * 0.4) +
    (sleep_hours * 1.5) +
    (attendance_percentage * 0.2) +
    np.random.normal(0, 3, num_samples) # Add some noise
)

# Cap the score at 100
final_score = np.clip(final_score, 0, 100)

data = pd.DataFrame({
    'StudyHours': study_hours,
    'PreviousScore': previous_score,
    'SleepHours': sleep_hours,
    'Attendance': attendance_percentage,
    'FinalScore': final_score
})

# 1.5 Load AI-Data.csv and map its columns
if os.path.exists('AI-Data.csv'):
    print("Loading AI-Data.csv and combining with synthetic data...")
    ai_data = pd.read_csv('AI-Data.csv')
    
    mapped_ai_data = pd.DataFrame({
        'StudyHours': (ai_data['raisedhands'] / 100.0) * 14.0,
        'PreviousScore': ai_data['VisITedResources'],
        'SleepHours': (ai_data['Discussion'] / 100.0) * 12.0,
        'Attendance': ai_data['AnnouncementsView'],
        'FinalScore': ai_data['Class'].map({'L': 40, 'M': 70, 'H': 95}).fillna(50)
    })
    
    data = pd.concat([data, mapped_ai_data], ignore_index=True)
    print(f"Combined dataset length: {len(data)} samples")

# Save the combined dataset to CSV for reference
data.to_csv('student_data.csv', index=False)
print("Data saved to student_data.csv")

# 2. Train and Tune the Model
X = data[['StudyHours', 'PreviousScore', 'SleepHours', 'Attendance']]
y = data['FinalScore']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5]
}

print("Starting Grid Search for hyperparameter tuning (this may take a moment)...")
rf = RandomForestRegressor(random_state=42)
grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, 
                           cv=5, n_jobs=-1, scoring='r2')

grid_search.fit(X_train, y_train)
model = grid_search.best_estimator_

# 3. Evaluate the Model
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print(f"\nModel Training & Tuning Complete.")
print(f"Best Hyperparameters: {grid_search.best_params_}")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R-squared Score: {r2:.4f}")

# 4. Save the Model
os.makedirs('../api/models', exist_ok=True)
with open('../api/models/rf_model.pkl', 'wb') as f:
    pickle.dump(model, f)
    
print("Model saved to ../api/models/rf_model.pkl")

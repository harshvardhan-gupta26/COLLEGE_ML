# SatLink AI — Intelligent Satellite Communication Quality Prediction

Full-stack prototype using the trained Random Forest model supplied for the project.

## Backend
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000

## Frontend
cd frontend
npm install
npm run dev

The frontend calls `http://localhost:8000/predict`.

## Model note
The target labels are project-defined heuristic labels based primarily on signal strength; they are not independently measured satellite-link ground truth.

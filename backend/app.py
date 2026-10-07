from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib, pandas as pd
from pathlib import Path
BASE=Path(__file__).resolve().parent
MODEL=joblib.load(BASE/'satlink_model.pkl'); FEATURES=joblib.load(BASE/'satlink_features.pkl')
app=FastAPI(title='SatLink AI API',version='1.0.0')
app.add_middleware(CORSMiddleware,allow_origins=['*'],allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
class PredictionInput(BaseModel):
 frequency: float=Field(...,ge=0); signal_strength: float; bandwidth: float=Field(...,ge=0); temperature: float; humidity: float; wind_speed: float; precipitation: float=Field(...,ge=0); wifi_strength: float; altitude: float; air_pressure: float; weather_condition: str; interference_type: str
def make_features(d):
 row={'Frequency':d.frequency,'Signal Strength':d.signal_strength,'Bandwidth':d.bandwidth,'Temperature':d.temperature,'Humidity':d.humidity,'Wind Speed':d.wind_speed,'Precipitation':d.precipitation,'WiFi Strength':d.wifi_strength,'Altitude(m)':d.altitude,'Air Pressure':d.air_pressure}
 for w in ['Cloudy','Rainy','Sunny']: row[f'Weather Condition_{w}']=int(d.weather_condition==w)
 for i in ['Adjacent-channel','Co-channel','Intermodulation','None/Unknown']: row[f'Interference Type_{i}']=int(d.interference_type==i)
 return pd.DataFrame([row]).reindex(columns=FEATURES,fill_value=0)
def recommendation(label):
 if label=='Good': return 'Communication conditions are currently stable. Continue normal monitoring.'
 if label=='Weak': return 'Communication quality may degrade. Monitor signal conditions and consider adjusting communication parameters.'
 return 'High risk of communication degradation. Take preventive action and closely monitor the satellite link.'
@app.get('/health')
def health(): return {'status':'ok','model':'RandomForestClassifier','features':len(FEATURES)}
@app.post('/predict')
def predict(data:PredictionInput):
 X=make_features(data); label=MODEL.predict(X)[0]; probs=MODEL.predict_proba(X)[0]
 return {'prediction':str(label),'probabilities':{str(c):round(float(p)*100,2) for c,p in zip(MODEL.classes_,probs)},'recommendation':recommendation(str(label)),'inputs':data.model_dump()}

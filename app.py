import json
from flask import Response, Flask, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pandas as pd

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/WWII_db"
app.config ['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return {"hello": "world"}

@app.route('/WWII', methods=['POST', 'GET'])
def handle_alt():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_alt = db.session.execute('select country from WWIIops2')
            db.session.add(new_alt)
            db.session.commit()
            return {"message": f"car {new_alt.Country} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        alt = db.session.execute('Select * From "WWIIops2"')
        columns = (
            'Mission_ID',
            'Mission_Date',
            'Theater_of_Operations',
            'Country',
            'Aircraft' ,
            'Takeoff_Base',
            'Takeoff_Location' ,
            'Takeoff_Latitude' ,
            'Takeoff_Longitude' ,
            'Target_Country' ,
            'Target_City' ,
            'Target_Latitude' ,
            'Target_Longitude' ,
            'Altitude',
            'High_Explosives',
            'High_Explosives_Type' ,
            'High_Explosives_Weight',
            'High_Explosives_Weight_Tons',
            'Incendiary_Devices',
            'Incendiary_Devices_Type',
            'Incendiary_Devices_Weight',
            'Incendiary_Devices_Weight_Tons',
            'Fragmentation_Devices',
            'Fragmentation_Devices_Type',
            'Fragmentation_Devices_Weight',
            'Fragmentation_Devices_Weight_Tons',
            'Total_Weight',
            'Total_Weight_Tons'
        )
        alt2 = alt.fetchall()
        results = []
        for row in alt2:
            results.append(dict(zip(columns, row)))
        with open('myjson.json','w') as f:
            json.dump(results, f, indent=2)
        results_final=pd.read_json('myjson.json')
        #print(results_final)
        results_final_csv_fin=results_final.to_csv(index=False)
        results_new=pd.read_csv('csvtest_file.csv',error_bad_lines=False)
        results_new=results_new.loc[results_new['Takeoff_Latitude'] != 'TUNISIA']
        results_new=results_new.loc[results_new['Takeoff_Base'] != '"TORTORELLA, FOGGIA"']
        results_new2=results_new.to_csv(index=False)
        #print(results_final_csv_fin)
        return (results_new2)
        #return json.dumps(results, indent=2)

if __name__ == '__main__':
    app.run(debug=True)
    app.run()
from flask import Flask, jsonify
from kafka import KafkaConsumer
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/get_patient_update')
def get_patient_update():
    consumer = KafkaConsumer('PatientUpdate', bootstrap_servers=['localhost:9092'])
    notifications = []
    for message in consumer:
        notification = json.loads(message.value.decode('utf-8'))
        notifications.append(notification)
        break
    return jsonify(notifications)


if __name__ == '__main__':
    app.run(debug=True)

import time

from kafka import KafkaProducer
import json


class PatientUpdateProducer:
    __producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
    __current_id = 0

    def send_notification(self, notification):
        named_tuple = time.localtime()  # get struct_time
        time_string = time.strftime("%m/%d/%Y, %H:%M:%S", named_tuple)
        notification["title"] += " (" + time_string+")"
        notification["id"] = self.__current_id
        self.__current_id += 1

        message = json.dumps(notification).encode('utf-8')
        self.__producer.send('PatientUpdate', value=message)

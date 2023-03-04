from random import randint
from time import sleep

from producers.patient_update_producer import PatientUpdateProducer


class DummyAdapter:
    __min_delay = 3
    __max_delay = 10

    def __init__(self, patient_update_producer: PatientUpdateProducer):
        self.__patient_update_producer = patient_update_producer

    def monitor_updates(self):
        while True:
            notification = {
                'title': 'New Patient Update',
                'message': 'A new patient update is available.'
            }
            self.__patient_update_producer.send_notification(notification)
            sleep(randint(self.__min_delay, self.__max_delay))

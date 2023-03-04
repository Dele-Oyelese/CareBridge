from adapters.dummy_adapter import DummyAdapter
from producers.patient_update_producer import PatientUpdateProducer

if __name__ == '__main__':
    patient_update_producer = PatientUpdateProducer()
    dummy_adapter = DummyAdapter(patient_update_producer)
    dummy_adapter.monitor_updates()

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import {MMContext} from "../../context/MMContext";
import {useState} from 'react';

const  MoodmetricInteractionButtons = () => {
    const {setMmLevel} = useContext(MMContext);
    const [myCharacteristic, setMyCharacteristic] = useState();

    const startDataReception = (e) => {
    
        let serviceUuid = "dd499b70-e4cd-4988-a923-a7aab7283f8e";
        let characteristicUuid = "a0956420-9bd2-11e4-bd06-0800200c9a66";
    
        console.log('Requesting Bluetooth Device...');
        navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
        .then(device => {
            console.log('Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Getting Service...');
            return server.getPrimaryService(serviceUuid);
        })
        .then(service => {
            console.log('Getting Characteristic...');
            return service.getCharacteristic(characteristicUuid);
        })
        .then(characteristic => {
            setMyCharacteristic(characteristic);
            return myCharacteristic.startNotifications().then(_ => {
            console.log('> Notifications started');
            myCharacteristic.addEventListener('characteristicvaluechanged',
                handleNotifications);
            });
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
    
    };
    
    const stopDataReception = (e) => {
        if (myCharacteristic) {
          myCharacteristic.stopNotifications()
          .then(_ => {
            console.log('> Notifications stopped');
            myCharacteristic.removeEventListener('characteristicvaluechanged',
                handleNotifications);
          })
          .catch(error => {
            console.log('Argh! ' + error);
          });
        }
    };
    
    function handleNotifications(event) {
        let value = event.target.value;
        setMmLevel(value.getUint8(1));
    }

    return (
        <div>
            <Row>        
                <Col><Button size="lg" variant="primary" onClick={(startDataReception)}>Start</Button></Col>
                <Col><Button size="lg" variant="primary" onClick={(stopDataReception)}>Stop</Button></Col>
            </Row>
        </div>
    );
}

export default MoodmetricInteractionButtons;
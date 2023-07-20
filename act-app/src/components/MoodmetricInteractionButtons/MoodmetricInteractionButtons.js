import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import {MMContext} from "../../context/MMContext";
import {useState} from 'react';

const  MoodmetricInteractionButtons = () => {
    const {setMmLevel} = useContext(MMContext);
    const {setStatus} = useContext(MMContext);
    const {setStatusBits} = useContext(MMContext);
    const [streamingCharacteristic, setStreamingCharacteristic] = useState();

    const startReceivingData = async () => {
        let serviceUuid = "dd499b70-e4cd-4988-a923-a7aab7283f8e";
        let streamingCharacteristicUuid = "a0956420-9bd2-11e4-bd06-0800200c9a66";
        try{
            console.log('Requesting Bluetooth Device...');
            setStatus('Requesting Bluetooth Device...');
            const device = await navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]});

            console.log('Connecting to GATT Server...');
            setStatus('Connecting...');
            const server = await device.gatt.connect();

            console.log('Getting Service...');
            const service = await server.getPrimaryService(serviceUuid);

            console.log('Getting Streaming Characteristic...');
            setStatus('Obtaining data stream...');
            setStreamingCharacteristic(await service.getCharacteristic(streamingCharacteristicUuid));

            await streamingCharacteristic.startNotifications();
            console.log('> Notifications started');
            
            streamingCharacteristic.addEventListener('characteristicvaluechanged', handleStreamingCharNotif);
            
            console.log('Event listeners ready');
            setStatus('Connected');
        }catch(error) {
            console.log('Argh! ' + error);
            setStatus('Connection failed');
        }
    };
    
    const stopReceivingData = async () => {
        if (streamingCharacteristic) {
          try{
            await streamingCharacteristic.stopNotifications();
            streamingCharacteristic.removeEventListener('characteristicvaluechanged', handleStreamingCharNotif);
            console.log('> Streaming Characteristic Notifications stopped');
            setMmLevel(0);
            setStatusBits(0);
            setStatus('Not connected');
          }catch(error) {
            console.log('Argh! ' + error);
        }
        }
    };
    
    function handleStreamingCharNotif(event) {
        let value = event.target.value;
        const sb = value.getUint8(0) & 0xff; 
        const mm = value.getUint8(1) & 0xff;
        setStatusBits(sb);
        setMmLevel(mm);
        if(sb!==2 && sb!==3 && sb!==10){
            console.log('Value: '+ value);
            console.log('Status bits: '+ sb + ' '+formatDate(new Date()));
        }
    }

    const formatTime = (num) => {
        return num < 10 ? `0${num}` : num.toString();
    };

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);
        return `${formatTime(date.getDate())}.${formatTime(date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      };

    return (
        <div>
            <Row>        
                {/* TODO: Turn these into just on button (on or off) */}
                <Col><Button size="lg" variant="primary" onClick={(startReceivingData)}>Start</Button></Col>
                <Col><Button size="lg" variant="primary" onClick={(stopReceivingData)}>Stop</Button></Col>
            </Row>
        </div>
    );
}

export default MoodmetricInteractionButtons;
import MenuBar from "../../components/MenuBar/MenuBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ringIcon from '../../images/ring-icon.png';
import "./Home.css";
import MoodmetricInteractionButtons from "../../components/MoodmetricInteractionButtons/MoodmetricInteractionButtons";
import { useState, useEffect, useContext} from 'react';
import {UserContext} from "../../context/UserContext";
import {sendNotifEmail} from "../../api/emailApi";

const  Home = () => {
    const { user } = useContext(UserContext);

    const [status, setStatus] = useState("Not connected");
    const [mmLevel, setMmLevel] = useState(0);
    const [activated, setActivated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [streamingCharacteristic, setStreamingCharacteristic] = useState();

    useEffect(() => {
      localStorage.setItem('counter', JSON.stringify(0));
      localStorage.setItem('waitTimeActive', JSON.stringify(0));
    }, []);
 
    const handleClick = () => {
      setLoading(true);
      setActivated(!activated);
      if(!activated){
          startReceivingData();
      }
      else{
          stopReceivingData();
      }
    }

    const startReceivingData = async () => {
        let serviceUuid = "dd499b70-e4cd-4988-a923-a7aab7283f8e";
        let streamingCharacteristicUuid = "a0956420-9bd2-11e4-bd06-0800200c9a66";
        try{
            setStatus('Requesting Bluetooth Device...');
            const device = await navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]});
            setStatus('Connecting...');
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService(serviceUuid);
            setStatus('Obtaining data stream...');
            setStreamingCharacteristic(await service.getCharacteristic(streamingCharacteristicUuid));
            await streamingCharacteristic.startNotifications();
            streamingCharacteristic.addEventListener('characteristicvaluechanged', handleStreamingCharNotif);
            setStatus('Connected');
            setLoading(false);
        }catch(error) {
            console.log('Argh! ' + error);
            setLoading(false);
            setActivated(false);
            setStatus('Connection failed');
        }
    };
  
    const stopReceivingData = async () => {
        if (streamingCharacteristic) {
          try{
            await streamingCharacteristic.stopNotifications();
            streamingCharacteristic.removeEventListener('characteristicvaluechanged', handleStreamingCharNotif);
            setMmLevel(0);
            setStatus('Not connected');
            setLoading(false);
            localStorage.setItem('counter', JSON.stringify(0));
            localStorage.setItem('waitTimeActive', JSON.stringify(0));
          }catch(error) {
            setLoading(false);
            setActivated(false);
            console.log('Argh! ' + error);
        }
        }
    };
  
    //Enters this function 3 times per second
    function handleStreamingCharNotif(event) {
        let value = event.target.value;
        const mm = value.getUint8(1) & 0xff;
        setMmLevel(mm);
        checkMMLevel(mm);
    }

    const checkMMLevel = (mmLevel) => {
      const HIGH_MM_LVL_MIN = 81;
      if(mmLevel >= HIGH_MM_LVL_MIN){
        var counter = JSON.parse(localStorage.getItem('counter'))+ 1;
        localStorage.setItem('counter', JSON.stringify(counter));
      }
      else{
          localStorage.setItem('counter', JSON.stringify(0));
      }
      handleTimer();
    };

    const handleTimer = () => {
      const MAX_DURATION = 900; //5 minutes
      const WAIT_TIME = 10800; //1 hour
      var currentCount = JSON.parse(localStorage.getItem('counter'));
      var waitTimeActive = JSON.parse(localStorage.getItem('waitTimeActive'));

      if(waitTimeActive===1){
        if(currentCount >= WAIT_TIME){
          localStorage.setItem('waitTimeActive', JSON.stringify(0));
          localStorage.setItem('counter', JSON.stringify(0));
        }
      }
      else{
        if(currentCount >= MAX_DURATION){
          sendNotifEmail(user.displayName, user.email);
          console.log("###### SEND NOTIF EMAIL ######");
          localStorage.setItem('counter', JSON.stringify(0));
          localStorage.setItem('waitTimeActive', JSON.stringify(1));
        }
      }
      
    }

    return (
      <div className="bg">
        <MenuBar/>
        <Container fluid="md">
        <Row className="mx-2 mt-5 mb-1">
          <Col><h4 className="white-text">MM level</h4></Col>
        </Row>
        <Row className="mx-5 my-0">
          <Col>
            <Card>              
              <Card.Body>
                <Row>
                <Col><Card.Img style={{ width: '180px' }} variant="top" src={ringIcon} /></Col>
                </Row>
                <Row>
                <Col>Status: {status}</Col>
                </Row>
                <Row>
                <Col><h2>{mmLevel}</h2></Col>
                </Row>
                <Row>
                <Col className="mb-5">Current MM level.</Col>
                </Row>
                <Row>
                <Col><MoodmetricInteractionButtons isLoading={isLoading} activated={activated} handleClick={handleClick} /></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
      </div>
    );
}
  
export default Home;
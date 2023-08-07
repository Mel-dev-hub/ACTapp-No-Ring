import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const  MoodmetricInteractionButtons = ({isLoading, activated, handleClick}) => {

    const getButtonLabel = () => {
    if(isLoading){
        return "Loading...";
    }
    else{
        if(activated){
            return "Turn OFF";
        }
        else{
            return "Turn ON";
        }
    }
    }

    return (
        <div>
            <Row>        
                <Col>
                <Button
                variant="primary"
                disabled={isLoading}
                onClick={(handleClick)}
                >
                {getButtonLabel()}
                </Button>
                </Col>
            </Row>
        </div>
    );
}

export default MoodmetricInteractionButtons;
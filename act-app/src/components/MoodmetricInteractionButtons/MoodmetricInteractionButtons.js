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
            <Button
                variant="primary"
                size="lg"
                disabled={isLoading}
                onClick={(handleClick)}
                >
                {getButtonLabel()}
            </Button>  
        </div>
    );
}

export default MoodmetricInteractionButtons;
import Box from '@material-ui/core/Box/Box'
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography'
import { useState, useEffect} from 'react'
import PlaceIcon from '@material-ui/icons/Place';
import './SideMenu.css'
function SideMenu(props){
    const [weatherConfig, setWeatherConfig] = useState(props.weatherConfig)
    useEffect(() => {
        setWeatherConfig(props.weatherConfig)
    }, [props])
    return (
        <Box className="side-menu-container" component="div" bgcolor="primary.light" color="primary.contrastText">
            <Box className="actions-container" display="flex" justifyContent="space-between" p={3} pt={2}>
                <Button  variant="contained"  color="primary">
                    <Typography variant="button">
                        Search for places
                    </Typography>
                </Button>
                <Button variant="contained"  color="primary" >
                    <Typography variant="button">
                            ?
                    </Typography>
                </Button>
            </Box>
            <Box className="clouds-container" display="flex" alignItems="center" justifyContent="center">
                <img className="cloud-img" src={weatherConfig.imgUrl}></img>
            </Box>
            <Box className="celsius-container" display="flex" alignItems="center" justifyContent="center" mt={15}>
                <Typography variant="h1" component="h2">
                   {weatherConfig.temperature.default}
                </Typography>
            </Box>
            <Box className="situation-container" display="flex" alignItems="center" justifyContent="center" mt={15}>
                <Typography variant="h4" component="h4">
                    {weatherConfig.situation}
                </Typography>
            </Box>
            <Box className="bottom-container" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box className="date-container">
                    <Typography variant="body2">
                        {weatherConfig.date.title} . {weatherConfig.date.fullDate}
                    </Typography>
                    
                </Box>
                <Box className="local-container" display="flex" alignItems="center" justifyContent="center" >
                    <PlaceIcon></PlaceIcon>
                    <Typography variant="body2">
                        {weatherConfig.local}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default SideMenu
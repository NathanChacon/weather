import './WeatherCard.css'
import Box from '@material-ui/core/Box/Box'
import Typography from '@material-ui/core/Typography/Typography'
import { useState, useEffect} from 'react'

function WeatherCard(props){
    const [weatherConfig, setWeatherConfig] = useState(props.weatherConfig)

    useEffect(() => {
        setWeatherConfig(props.weatherConfig)
    }, [props])

    return (
        <Box className="weather-card" bgcolor="primary.light">
            <Typography variant="body1" style={{textAlign:"center"}}>
               {weatherConfig.date.fullDate}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" className="weather-image">
                <img src={weatherConfig.imgUrl}></img>
            </Box>
            <Box display="flex" justifyContent="space-between" pr={1} pl={1}>
                <Typography variant="body2">
                    {weatherConfig.temperature.min}
                </Typography>
                <Typography variant="body2">
                    {weatherConfig.temperature.max}
                </Typography>
            </Box>
        </Box>
    )
}

export default WeatherCard
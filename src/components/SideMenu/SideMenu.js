import Box from '@material-ui/core/Box/Box'
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography'
import { useState, useEffect} from 'react'
import PlaceIcon from '@material-ui/icons/Place';
import Skeleton from '@material-ui/lab/Skeleton';
import './SideMenu.css'
function SideMenu(props){
    const [weatherConfig, setWeatherConfig] = useState(props.weatherConfig)
    useEffect(() => {
        setWeatherConfig(props.weatherConfig)
    }, [props])
    
    const onSearch = () => {
        props.onSearch()
    }

    return (
        <Box className="side-menu-container" component="div" bgcolor="primary.light" color="primary.contrastText" display="flex" flexDirection="column" alignItems="center">
            <Box className="actions-container" display="flex" justifyContent="space-between" p={3} pt={2}>
                <Button variant="contained"  color="primary" onClick={() => {onSearch()}}>
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
                {
                    weatherConfig.imgUrl ?
                    <img className="cloud-img" src={weatherConfig.imgUrl}></img>
                    :
                    <Skeleton variant="rect" width='250px' height='250px' />
                }
            </Box>
            <Box style={{width:'80%'}} mt={15}>
                <Typography variant="h1" component="h2" style={{width:'100%'}}>
                    {weatherConfig.temperature.default ? 
                        weatherConfig.temperature.default
                        :
                        <Skeleton width="100%" variant="text" />    
                    }
                </Typography>
            </Box>
            <Box style={{width:'80%'}} mt={15}>
                <Typography variant="h4" component="h4" style={{width:'100%'}}>
                    {
                        weatherConfig.situation ? 
                        weatherConfig.situation
                        :
                        <Skeleton width="100%" variant="text"></Skeleton>
                    }
                </Typography>
            </Box>
            <Box className="bottom-container" style={{width:'80%'}}>
                <Box className="date-container" style={{width:'100%'}}>
                    <Typography variant="body2" style={{width:'100%'}}>
                        {
                            weatherConfig.date.title && weatherConfig.date.fullDate ?
                            weatherConfig.date.title . weatherConfig.date.fullDate
                            :
                            <Skeleton width="100%" variant="text"></Skeleton>
                        }
                    </Typography>
                </Box>
                <Box style={{width: '100%'}} >
                    {weatherConfig.local ? <PlaceIcon></PlaceIcon> : ''}
                    <Typography variant="body2" style={{width: '100%'}}>
                        {
                            weatherConfig.local ? 
                            weatherConfig.local 
                            :
                            <Skeleton width="100%" variant="text"></Skeleton>
                        }
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default SideMenu
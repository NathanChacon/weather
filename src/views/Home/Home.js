import './Home.css'
import Box from '@material-ui/core/Box/Box'
import SideMenu from '../../components/SideMenu/SideMenu'
import SearchMenu from '../../components/SearchMenu/SearchMenu'
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import HightlightCard from '../../components/HightlightCard/HightlightCard'
import { useEffect, useState } from 'react'
import Api from '../../utils/api/api'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
function Home(){
    const [todayWeather, setTodayWeather] = useState({
        temperature: {
            default:null,
            min: null,
            max: null
        },
        local: null,
        situation: null,
        date: {
            title: null,
            fullDate: null
        },
        imgUrl: null,
        hightlights: {
            wind: null,
            humidity: null,
            airPressure: null,
            visibility: null
        }
    })
    const [weathers, setWeathers] = useState([null,null,null,null,null])
    const [hightlights, setHightlights] = useState([null,null,null,null])
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false)

    useEffect(() => {
        startWeatherData()
    },[])

    const startWeatherData = async () => {
        try{
            const position = await getCurrentPosition()
            const rawWeathers = await getWeathers(position.coords.latitude, position.coords.longitude)
            const weathers = getFormattedWeathers(rawWeathers)
            const todayWeatherAux = weathers.shift()
            const hightlightsCardsConfig = getHightlightsCardsConfig(todayWeatherAux)
            console.log("teste", todayWeatherAux)
            setTodayWeather((prevState) => ({...prevState, ...todayWeatherAux}))
            console.log("teste2", todayWeather)
            setWeathers((prevState) => (weathers))
            setHightlights((prevState) => (hightlightsCardsConfig))
        }
        catch(error){
            console.log('error', error)
        }
    }

    const onOpenSearchMenu = () => {
        setIsSearchMenuOpen(true)
    }

    const getWeathers = async (lat, long) => {
        const woid = await getWoid(lat, long)
        const weatherRawData = await getWeatherInfoByWoid(woid)
        return weatherRawData
    }

    const getFormattedWeathers = (rawWeathers) => {
        const formattedWeathers = []
        rawWeathers.consolidated_weather.forEach(rawWeather => {
            const img = `https://www.metaweather.com/static/img/weather/${rawWeather.weather_state_abbr}.svg`
            const date = dateFactory('teste', getFormattedDate(new Date(rawWeather.applicable_date).toUTCString())) 
            const temperature = temperatureFactory(Math.floor(rawWeather.the_temp), Math.floor(rawWeather.max_temp),  Math.floor(rawWeather.min_temp))
            const hightlights = hightlightsFactory(rawWeather.wind_speed, rawWeather.humidity, rawWeather.air_pressure, Math.floor(rawWeather.visibility))

            const weather = weatherFactory(
                temperature, 
                rawWeathers.title, 
                rawWeather.weather_state_name, 
                date, 
                img,
                hightlights
            )
           formattedWeathers.push(weather)
        })

        return formattedWeathers
    }

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position)
                })
            } 
            else {
                reject("Cannot get position")
            }
        })
    }

    const getWoid = (lat, long) => {
        return new Promise(async (resolve, reject) => {
            try{
                const response = await Api.get(`location/search/?lattlong=${lat},${long}`)
                const woeid = response.data[0].woeid
                resolve(woeid)
            }
            catch(error){
                reject("Cannot get woid")
            }
        })
    }

    const getWeatherInfoByWoid = (woid) => {
        return new Promise(async (resolve, reject) => {
            try{
                const response = await Api.get(`location/${woid}`)
                resolve(response.data)
            }
            catch(error){
                reject("Cannot get location weather info")
            }
        })
    }

    const getHightlightsCardsConfig = (todayWeather) => {
        return [
            {
                header:'Wind status',
                title: Math.floor(todayWeather.hightlights.wind)
            },
            {
                header:'Humidity',
                title: todayWeather.hightlights.humidity
            },
            {
                header:'Visibility',
                title: todayWeather.hightlights.visibility
            },
            {   
                header: 'Air pressure',
                title: todayWeather.hightlights.airPressure
            }
        ]
    }

    const weatherFactory = (temperature, local, situation, date, imgUrl, hightlights) => {
        return {
            temperature,
            local,
            situation,
            date,
            imgUrl,
            hightlights
        }
    }

    const temperatureFactory = (defaultTemp, max, min) => {
        return {
            default: defaultTemp,
            max,
            min
        }
    }

    const hightlightsFactory = (wind, humidity, airPressure, visibility) => {
        return {
            wind,
            humidity,
            airPressure,
            visibility
        }
    }

    const dateFactory = (title, fullDate) => {
        return {
            title,
            fullDate
        }
    }

    const getFormattedDate = (utcDate) => {
        const dateArray = utcDate.split(' ')
        return dateArray[0] + dateArray[1] + dateArray[2]
    }

    return (
        <Box component="section" className="home-container" display="flex" bgcolor="primary.dark" color="primary.contrastText">
            <SideMenu weatherConfig = {todayWeather} onOpenSearchMenu={onOpenSearchMenu}></SideMenu>
            <Box className="main-wrapper" display="flex" justifyContent="center">
                <Box className="main-content" pt={5} paddingBottom={5}>
                    <Grid container className="cards-container" spacing={2}>
                        {
                            weathers.map((weather, index) => {
                                return <Grid item xs={6} sm={6} md={6} lg={4}>
                                            {weather ? 
                                                <WeatherCard key={index} weatherConfig = {weather}></WeatherCard>
                                                :
                                                <Skeleton height="177px" />
                                            }
                                        </Grid> 
                            })
                        }
                    </Grid>
                    <Box className="cards-hightlights-container" style={{width:"100%"}} display="flex" flexDirection="column" mt={3}>
                        <Box style={{width:'100%'}} mb={2}>
                            <Typography variant="h5">
                                Today`s HightLights
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            {
                                hightlights.map((hightlight, index) => {
                                    return<Grid item xs={12} sm={12} md={12} lg={6}>
                                            {
                                                hightlight ?
                                                <HightlightCard hightlight = {hightlight} key={index} width="100%"></HightlightCard>
                                                :
                                                <Skeleton height="200px" />
                                             }
                                            </Grid>
                                })
                            }
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <SearchMenu open={isSearchMenuOpen}></SearchMenu>
        </Box> 
    )
}

export default Home
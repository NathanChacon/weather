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
    const [places, setPlaces] = useState([])

    useEffect(() => {
        setWeatherOfCurrentLocation()
    },[])

    const setWeatherOfCurrentLocation = async () => {
        const position = await getCurrentPosition()
        const woeid = await getWoeid(position.coords.latitude, position.coords.longitude)
        startWeatherData(woeid)
    }

    const startWeatherData = async (woeid) => {
        try{
            setSkeletons()
            const rawWeathers = await getWeathers(woeid)
            const weathers = getFormattedWeathers(rawWeathers)
            const todayWeatherAux = weathers.shift()
            const hightlightsCardsConfig = getHightlightsCardsConfig(todayWeatherAux)

            setTodayWeather((prevState) => ({...prevState, ...todayWeatherAux}))
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

    const onCloseSearchMenu = () => {
        setIsSearchMenuOpen(false)
        setPlaces([])
    }

    const getWeathers = async (woeid) => {
        const weatherRawData = await getWeatherInfoByWoid(woeid)
        return weatherRawData
    }

    const getFormattedWeathers = (rawWeathers) => {
        const formattedWeathers = []
        rawWeathers.consolidated_weather.forEach(rawWeather => {
            const img = `https://www.metaweather.com/static/img/weather/${rawWeather.weather_state_abbr}.svg`
            const date = dateFactory('teste', getFormattedDate(new Date(rawWeather.applicable_date).toUTCString())) 
            const temperature = temperatureFactory(Math.floor(rawWeather.the_temp) + '°C', Math.floor(rawWeather.max_temp) + '°C',  Math.floor(rawWeather.min_temp) + '°C')
            const hightlights = hightlightsFactory(Math.floor(rawWeather.wind_speed) + ' mph', rawWeather.humidity + '%', Math.floor(rawWeather.air_pressure) + ' mb', Math.floor(rawWeather.visibility) + ' miles')

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

    const getWoeid = (lat, long) => {
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
                title: todayWeather.hightlights.wind
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

    const onSearchPlaces = async (placeName) => {
        if(placeName){
            try{
              const places = await getPlaceByName(placeName)
              setPlaces((prevState) => (places))
            }
            catch(error){
                console.log('error teste', error)
            }
            
        }
    }

    const getPlaceByName = (placeName) => {
        return new Promise((resolve, reject) => {
            Api.get(`/api/location/search/?query=${placeName}`)
            .then(
                (response) => {
                    resolve(response.data)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    const onClickPlace = (woeid) => {
        startWeatherData(woeid)
    }

    const setSkeletons = () => {
        setTodayWeather(prev => {
            return {
                ...prev,
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
            }
        })
        setWeathers([null,null,null,null,null])
        setHightlights([null,null,null,null])
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
                                                <Skeleton height='100%' animation="wave"/>
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
                                                <Skeleton height="200px" animation="wave"/>
                                             }
                                            </Grid>
                                })
                            }
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <SearchMenu 
                open={isSearchMenuOpen} 
                onClose={onCloseSearchMenu} 
                onSearchPlaces = {onSearchPlaces} 
                places={places}
                onClickPlace={onClickPlace}
                >
            </SearchMenu>
        </Box> 
    )
}

export default Home
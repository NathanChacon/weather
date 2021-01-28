import './Home.css'
import Box from '@material-ui/core/Box/Box'
import SideMenu from '../../components/SideMenu/SideMenu'
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import { useEffect, useState } from 'react'
import Api from '../../utils/api/api'
import { Typography } from '@material-ui/core'
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
    const [weathers, setWeathers] = useState([])

    useEffect(() => {
        startWeatherData()
    },[])

    const startWeatherData = async () => {
        try{
            const position = await getCurrentPosition()
            const rawWeathers = await getWeathers(position.coords.latitude, position.coords.longitude)
            const weathers = getFormattedWeathers(rawWeathers)
            const todayWeather = weathers.shift()
            setTodayWeather((prevState) => ({...prevState, ...todayWeather}))
            setWeathers((prevState) => (weathers))
        }
        catch(error){
            console.log('error', error)
        }
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
            const hightlights = hightlightsFactory(rawWeather.wind_speed, rawWeather.humidity, rawWeather.airPressure)

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
            <SideMenu weatherConfig = {todayWeather}></SideMenu>
            <Box className="main-content">
                <Box className="cards-container" display="flex" alignItems="center" justifyContent="center">
                    {
                        weathers.map((weather, index) => {
                            return <WeatherCard key={index} weatherConfig = {weather}></WeatherCard>
                        })
                    }
                </Box>
                <Box className="cards-hightlights-container" display="flex" alignItems="center" justifyContent="center">
                    <Box className="teste">
                        <Typography variant="h5">
                            Today`s HightLights
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box> 
    )
}

export default Home
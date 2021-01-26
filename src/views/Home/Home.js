import './Home.css'
import Box from '@material-ui/core/Box/Box'
import SideMenu from '../../components/SideMenu/SideMenu'
import { useEffect, useState } from 'react'
import Api from '../../utils/api/api'
function Home(){
    const [weatherConfig, setWeatherConfig] = useState({})
    useEffect(() => {
        startSideMenuData()
    },[])

    const startSideMenuData = async () => {
        try{
            const currentPosition = await getCurrentPosition()
            const woid = await getWoid(currentPosition.coords.latitude, currentPosition.coords.longitude)
            const weatherRawData = await getWeatherInfoByWoid(woid)
            const firstWeather = weatherRawData.consolidated_weather.shift()
            const weather = weatherFactory(
                firstWeather.the_temp, 
                weatherRawData.title, 
                firstWeather.weather_state_name, 
                new Date(firstWeather.applicable_date), 
                'today'
            )
            console.log(weather)
            setWeatherConfig(prev => {return {...weather}})
            console.log(weatherConfig)
        }
        catch(error){
            console.log(error)
        }
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
                console.log(error)
                reject("Cannot get woid")
            }
        })
    }

    const getWeatherInfoByWoid = (woid) => {
        return new Promise(async (resolve, reject) => {
            try{
                const response = await Api.get(`location/${woid}`)
                console.log("response teste", response)
                resolve(response.data)
            }
            catch(error){
                reject("Cannot get location weather info")
            }
        })
    }

    const weatherFactory = (temperature, local, situation, dateNumber, dateTitle) => {
        return {
            temperature,
            local,
            situation,
            dateNumber,
            dateTitle
        }
    }

    return (
        <Box component="section" className="home-container" bgcolor="primary.dark" color="primary.contrastText">
            <SideMenu weatherConfig = {weatherConfig}></SideMenu>
        </Box> 
    )
}

export default Home
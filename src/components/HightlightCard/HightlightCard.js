import './HightlightCard.css'
import Box from '@material-ui/core/Box/Box'
import Typography from '@material-ui/core/Typography/Typography'
import { useState, useEffect} from 'react'
function  HightlightCard (props){
    const [hightlight, setHightlight] = useState(props.hightlight)
    const [width, setWidth] = useState(props.width)
    useEffect(() => {
       setHightlight(props.hightlight)
       setWidth(props.width)
    }, [props])

    return (
        <Box className="hightlight-card-container" bgcolor="primary.light" style={{width:width}} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">
                {hightlight.header}
            </Typography>
            <Typography variant="h1">
                {hightlight.title}
            </Typography>
        </Box>
    )
}


export default HightlightCard
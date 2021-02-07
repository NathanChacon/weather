import './HightlightCard.css'
import Box from '@material-ui/core/Box/Box'
import Typography from '@material-ui/core/Typography/Typography'
import LinearProgress from '@material-ui/core/LinearProgress';
import { useState, useEffect} from 'react'
function  HightlightCard (props){
    const [hightlight, setHightlight] = useState(props.hightlight)
    const [width, setWidth] = useState(props.width)
    const [progress, setProgress] = useState(props.progress)

    useEffect(() => {
       setHightlight(props.hightlight)
       setWidth(props.width)
       setProgress(props.progress)
    }, [props])

    return (
        <Box className="hightlight-card-container" bgcolor="primary.light" style={{width:width}} display="flex" flexDirection="column" alignItems="center" p={3}>
            <Typography variant="h6">
                {hightlight.header}
            </Typography>
            <Typography variant="h2">
                {hightlight.title}
            </Typography>
            {
                progress ? 
                    <LinearProgress style={{width:'80%', height:'10px',  marginTop:"8px"}} variant="determinate" value={progress.value}></LinearProgress>
                : 
                ''
            }
        </Box>
    )
}


export default HightlightCard
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography'
import './SearchMenu.css'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
    cssLabel: {
        color : 'white'
    },  
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `white !important`
        },
        color:'white !important'
    },
    cssFocused: {
        color:'white !important'
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important',
    },
  }));

function SearchMenu(props){
    const [open, setOpen] = useState(props.open)
    const classes = useStyles();
    const [place, setPlace] = useState('')
    const [places, setPlaces] = useState(props.places)

    useEffect(() => {
        setOpen(props.open)
        setPlaces(props.places)
    }, [props])

    const onClose = () => {
        setPlace('')
        props.onClose()
    }

    const onSearchPlaces = () => {
        props.onSearchPlaces(place)
    }

    const onClickPlace = (woeid) => {
        props.onClickPlace(woeid)
        onClose()
    }   
    
    const handleInputChange = (event) =>{
        setPlace(event.target.value);
    }

    return (
        <Drawer anchor='left' open={props.open} onClose={onClose}>
            <Box className="search-menu-container" style={{overflow:'auto'}} bgcolor="primary.dark" pl={1} pr={1} color="primary.contrastText"  display="flex" flexDirection="column" >
                <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button classes = {{root: classes.cssLabel}} onClick={() => {onClose()}}>
                        <CloseIcon></CloseIcon>
                    </Button>
                </Box>
                <Box display="flex" justifyContent="space-between" pt={2}>
                    <TextField
                        label="search location"
                        id="outlined-start-adornment"
                        value={place}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                        }}
                        variant="outlined"
                    />
                    <Button variant="contained"  color="primary" onClick={onSearchPlaces}>
                        <Typography variant="button">
                                Search
                        </Typography>
                    </Button>
                </Box>
                <List>
                    {
                        places.map((place, index) => {
                            return <ListItem button={true} key={index} onClick={() => {onClickPlace(place.woeid)}}>
                                        <ListItemText primary={place.title}></ListItemText>
                                        <ListItemIcon className={classes.cssLabel}>
                                            <ArrowRightIcon/>
                                        </ListItemIcon>
                                    </ListItem>
                        })
                    }
                </List>
           </Box>
        </Drawer>
    )
}

export default SearchMenu
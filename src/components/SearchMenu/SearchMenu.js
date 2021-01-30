import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button/Button'
import Typography from '@material-ui/core/Typography'
import './SearchMenu.css'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

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

    useEffect(() => {
        setOpen(props.open)
    }, [props])

    const onClose = () => {
        props.onClose()
    }

    return (
        <Drawer anchor='left' open={props.open} onClose={onClose}>
            <Box className="search-menu-container" bgcolor="primary.dark" pl={1} pr={1} color="primary.contrastText">
                <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button classes = {{root: classes.cssLabel}} onClick={() => {onClose()}}>
                        <CloseIcon></CloseIcon>
                    </Button>
                </Box>
                <Box display="flex" justifyContent="space-between" pt={2}>
                    <TextField
                        label="search loaction"
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                                cssLabel: classes.cssLabel
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                        }}
                        color="white"
                        variant="outlined"
                    />
                    <Button variant="contained"  color="primary" >
                        <Typography variant="button">
                                Search
                        </Typography>
                    </Button>
                </Box>
                <ul style={{width:'100%'}}>
                    <li>teste</li>
                    <li>teste</li>
                    <li>teste</li>
                    <li>teste</li>
                    <li>teste</li>
                </ul>
           </Box>
        </Drawer>
    )
}

export default SearchMenu
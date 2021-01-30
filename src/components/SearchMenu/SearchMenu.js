import Drawer from '@material-ui/core/Drawer';
import {useEffect, useState} from 'react'
function SearchMenu(props){
    const [open, setOpen] = useState(props.open)

    useEffect(() => {
        setOpen(props.open)
    }, [props])

    const onClose = () => {
        console.log('on close works')
    }
    return (
        <Drawer anchor='left' open={props.open} onClose={onClose}>
           <ul>
               <li>teste</li>
               <li>teste</li>
               <li>teste</li>
               <li>teste</li>
               <li>teste</li>
           </ul>
        </Drawer>
    )
}

export default SearchMenu
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { ReactComponent as Arrow } from '../assets/icons/arrow-right.svg'
import { ReactComponent as Active } from '../assets/icons/active.svg'
import { ResourceItem } from "../utils"

interface Props {
    item: ResourceItem,
    isActive?: boolean,
    onClick: () => void,
}

const SideBarItems: React.FC<Props> = ({ item, isActive = false, onClick }) => {
    return (
        <ListItem selected={isActive}  button onClick={onClick}>
            <ListItemIcon>
                <Active />
            </ListItemIcon>
            <ListItemText primary={item.name} />
            {isActive && <Arrow />}
        </ListItem>
    )
}

export default SideBarItems
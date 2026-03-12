import {Chip, IconButton, ListItem, ListItemText} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
export default function TransportItem({transport, onEdit}) {
    return (
        <ListItem
            className="transportItem"
            secondaryAction={
                <IconButton edge="end" onClick={onEdit}>
                    <EditIcon />
                </IconButton>
            }
        >
            <ListItemText
                primary={`Transport ${transport.id}`}
                secondary={
                    <Chip
                        label={transport.status}
                        size="small"
                    />
                }
            />
        </ListItem>
    )
}
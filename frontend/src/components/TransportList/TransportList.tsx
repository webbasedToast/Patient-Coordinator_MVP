import {useQuery} from "@tanstack/react-query";

import {fetchTransports} from "../../api/transports.ts";
import TransportItem from "../TransportItem/TransportItem.tsx";
import "./TransportList.scss"
import {List} from "@mui/material";
export default function TransportList({ onEdit }) {

    const {data, isLoading, error} = useQuery({
        queryKey: ["transports"],
        queryFn: fetchTransports
    })

    console.log("TransportList:", {data, isLoading, error})



    return (
        <List className="transportList">
            {data?.map((t) => (
                <TransportItem
                    key={t.id}
                    transport={t}
                    onEdit={() => onEdit(t)}
                />
            ))}
        </List>
    )
}

import { IClient } from "../clientInfo/ClientInfo"

interface IClientProps {
    client: IClient
}

export const ClientDashboard = (props: IClientProps) => {
    return (
        <div>
            <p>Välkommen {props.client.name}</p>
        </div>
    )
}
import axios from "axios";
import { IClient, ServiceResponse } from "../App";

const url = "http://localhost:1337/api/customers";

export const readClients = () => axios.get<ServiceResponse<IClient[]>>(url);
// export const createClient = (newClient: any) => {
//     axios.post(url, {'data': {
//         'name': newClient?.name
//     }})}
// export const updateClient = (id: number, updatedClient: any) =>
//   axios.put(`${url}//${id}`, updatedClient);
// export const deleteClient = (id: number) => axios.delete(`${url}/${id}`);

import axios from "axios";

const url = "http://localhost:1337/api/local/auth";

export const logIn = async (email: string, password: string) => axios.post("http://localhost:1337/api/auth/local", {identifier: email, password: password})

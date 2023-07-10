import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5005",
})

export const getMessageReply = async ({ text, user }: { text: string; user: string }) => {
  const { data } = await api.post<string>("/chat", { text, user })
  return data
}

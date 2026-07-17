// C:\PoliceAI-Command-Center\client\src\services\socket.js
import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";

function useRooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const socket = io("http://192.168.1.46:4000");
    axios
      .get("http://192.168.1.46:4000/rooms")
      .then((response) => setRooms(response.data))
      .catch((error) => console.log(error));
    socket.on("New room", (activeRooms) => {
      setRooms(activeRooms);
    });
  }, []);

  return { rooms };
}

export default useRooms;

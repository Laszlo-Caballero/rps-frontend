import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";

function useRooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const socket = io(
      "https://server-ij38c2xyx-laszlo-caballeros-projects.vercel.app"
    );
    axios
      .get(
        "https://server-ij38c2xyx-laszlo-caballeros-projects.vercel.app/rooms"
      )
      .then((response) => setRooms(response.data))
      .catch((error) => console.log(error));
    socket.on("New room", (activeRooms) => {
      setRooms(activeRooms);
    });
  }, []);

  return { rooms };
}

export default useRooms;

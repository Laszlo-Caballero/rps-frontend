import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./../images/logo.svg?react";
function RoomIndex() {
  const [rooms, setRooms] = useState([]);
  const [inputRoom, setInputRoom] = useState("");
  const navigate = useNavigate();
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
  return (
    <>
      <main className="bg-gradient-to-r from-BackgroundRadientP to-BackgroundRadientR h-screen flex flex-col items-center justify-center  min-w-screen font-BarlowRegular text-white gap-y-6">
        <header className="h-auto w-1/2 mt-6">
          <Logo />
        </header>
        <section className="lg:w-1/2 h-[70%] mobile:px-4">
          <article className="h-[80%] w-full  border-2 rounded-xl">
            <ul className="h-full flex flex-col gap-y-4 p-6">
              {rooms.map((elemet, index) => {
                return (
                  <li key={index} className="flex justify-between">
                    {elemet.players >= 2 ? (
                      <p className="font-BarlowMedium text-2xl">
                        {elemet.room}
                      </p>
                    ) : (
                      <Link
                        to={elemet.room}
                        className="font-BarlowMedium text-2xl"
                      >
                        {elemet.room}
                      </Link>
                    )}
                    <span className="text-xl">players: {elemet.players}</span>
                  </li>
                );
              })}
            </ul>
          </article>
          <article className="flex gap-12 items-center w-full justify-center mt-3">
            <input
              name="room"
              type="text"
              className="lg:h-[30px] mobile:h-[40px] rounded-full text-black px-3"
              value={inputRoom}
              onChange={(e) => {
                setInputRoom(e.target.value);
              }}
            />

            <button
              className="border-2 py-1 px-5 rounded-xl text-xl"
              onClick={() => {
                navigate(`${inputRoom}`);
              }}
            >
              Create Room
            </button>
          </article>
        </section>

        <footer className="w-full flex lg:justify-end mobile:justify-center px-8">
          <Link to="/" className="border-2 px-6 py-2 rounded-xl h-[45px]">
            Menu
          </Link>
        </footer>
      </main>
    </>
  );
}

export default RoomIndex;

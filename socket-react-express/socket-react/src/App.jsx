import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io("http://localhost:3000/", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    setSocket(connection);
  }, []);
  const handleSend = () => {
    socket.emit("message", message);
    socket.on("showMessage", (data) => {
      setShowMessage(data);
    });
  };

  return (
    <div>
      <h1>ALl Is Ok</h1>

      <p>{showMessage}</p>

      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default App;

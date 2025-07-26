import { useEffect, useState } from "react";

export default function useOnlineStatus(checkInterval = 10000) {
  const [isOnline, setIsOnline] = useState(navigator.onLine); 

  useEffect(() => {
    let intervalId;
    const controller = new AbortController();

    const checkConnection = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
          method: "GET",
          signal: controller.signal, 
        });
        setIsOnline(response.ok);
      } catch (err) {
        setIsOnline(false);
      }
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    checkConnection();

    intervalId = setInterval(checkConnection, checkInterval);

    return () => {
      clearInterval(intervalId);
      controller.abort(); 
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [checkInterval]);

  return isOnline;
}

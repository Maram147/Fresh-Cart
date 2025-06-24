import { useEffect, useState } from "react";

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true); 
  const checkConnection = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (response.ok) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (err) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkConnection(); 

    const interval = setInterval(() => {
      checkConnection(); 
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return isOnline;
}

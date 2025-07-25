import { useEffect, useState } from "react";

export default function useOnlineStatus(checkInterval = 10000) {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // الحالة الأولية من المتصفح

  useEffect(() => {
    let intervalId;
    const controller = new AbortController();

    // ✅ دالة للتحقق من الاتصال بالإنترنت عبر API
    const checkConnection = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
          method: "GET",
          signal: controller.signal, // يسمح بالإلغاء عند unmount
        });
        setIsOnline(response.ok);
      } catch (err) {
        setIsOnline(false);
      }
    };

    // ✅ تحديث الحالة عند أحداث online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // ✅ التحقق أول مرة
    checkConnection();

    // ✅ التحقق كل فترة
    intervalId = setInterval(checkConnection, checkInterval);

    return () => {
      clearInterval(intervalId);
      controller.abort(); // إلغاء أي fetch قيد التشغيل
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [checkInterval]);

  return isOnline;
}

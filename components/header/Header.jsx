import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";

export const Header = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataCookie = getCookie('user-data');

    if (userDataCookie) {
      try {
        const decodedCookie = decodeURIComponent(userDataCookie);
        const parsedUserData = JSON.parse(decodedCookie)[0];
        setUserData(parsedUserData);

      } catch (error) {
        console.error('Error parsing user-data cookie:', error);
      }
    }
  }, []);

  return (
    <header className="text-white">
      <nav className="bg-rm-blue-100 text-white fixed w-full flex justify-end p-3">
        <span className="font-semibold">
          {`${userData?.first_name} ${userData?.last_name} `}
        </span>
      </nav>
    </header>
  );
};

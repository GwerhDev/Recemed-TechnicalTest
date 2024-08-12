import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCookie";
import { ActionButton } from "../buttons/ActionButton";
import logo from "../../assets/png/logo.png";

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
    <header className="h-16">
      <nav className="fixed w-full bg-white flex justify-between items-center shadow-md p-2 pl-4 pr-4">
        <span>
          <img src={logo} alt="" width={"100px"} />
        </span>
        {
          userData &&
          <span className="font-bold uppercase text-[12px] flex gap-4 items-center">
            <p>
              {`${userData?.first_name} ${userData?.last_name} `}
            </p>
            <ActionButton text="cerrar sesión" action="/_auth/logout" />
          </span>
        }
      </nav>
    </header>
  );
};

import { useEffect } from "react";
import useTokenStore from "@/store/tokenProvider";
import axios from "axios";

function TokenRefresher() {
  const access_token = useTokenStore((state) => state.access_token);
  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    const refreshTokenInterval = setInterval(() => {
      axios
        .post("http://localhost:8080/auth/refresh", {
          refreshToken: refresh_token,
        })
        .then((response) => {
          useTokenStore.setState({
            access_token: response.data.accessToken,
          });
          localStorage.setItem("access_token", response.data.accessToken);
        })
        .then(() => {
          console.log("Token refreshed");
        })
        .catch((error) => {
          console.error("Token refresh failed:", error);
        });
    }, 600000);

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [access_token]);

  return null;
}

export default TokenRefresher;
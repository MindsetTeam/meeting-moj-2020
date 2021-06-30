import { useEffect, useState } from "react";
import API from "./api";

const useAuthToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const res = await API.getUserToken();
        setToken(res.token);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let intervalFetchAuth;
    if (error) {
      intervalFetchAuth = setInterval(async () => {
        try {
          const res = await API.getUserToken();
          setError("");
          setToken(res.token);
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    }
    return () => {
      clearInterval(intervalFetchAuth);
    };
  }, [error]);

  return {
    isLoading,
    error,
    token,
  };
};

export default useAuthToken;

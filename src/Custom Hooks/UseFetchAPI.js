import axios from "axios";
import { useState, useEffect } from "react";

export default function UseFetchAPI(url, type, data) {
  const [apiResults, setapiResults] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchApi = () => {
    if (type === "post") {
      axios
        .post(url, data)
        .then((response) => {
          setapiResults(response);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "get") {
      axios
        .get(url)
        .then((response) => {
          setapiResults(response);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);
  return { apiResults, isLoading };
}

import axios from "axios";

export const apiRequest = async (url : string, method : string, data :any = null) => {
  try {
    const baseURL = `${process.env.REACT_APP_API_URL}`;
    const fullURL = baseURL + url;
    const response = await axios({
    method,
     url: fullURL,
      data,
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (response) {
      return response;
    } else {
      console.log("No response received");
    }
  } catch (error) {
    console.error(error);
  }
};

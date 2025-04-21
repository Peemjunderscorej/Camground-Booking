import { Booking } from "../construnctor/Booking"; // (you'll rename Project.js to Campground.js later)

const baseUrl = "http://localhost:5000";
const url = `${baseUrl}/api/v1/appointments`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the booking(s).";
    default:
      return "There was an error retrieving the booking(s). Please try again.";
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToBookingModels(data) {
  return data.data.map(convertToBookingModel);
}

function convertToBookingModel(item) {
  return new Booking(item);
}

const bookingAPI = {
  get(page = 1, token, userName) {
    // return fetch(`${url}?page=${page}&limit=${limit}&sort=user`, {
      let apiUrl = `${url}?page=${page}&sort=name`

      if(userName) {
        apiUrl += `&search=${userName}`;
      }
      console.log("fetch at : ", apiUrl)
      return fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      // .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToBookingModels)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the bookings. Please try again.");
      });
  },

  find(id) {
    return fetch(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToBookingModel)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the bookings. Please try again.");
      });
  },

  post(_id, token, arriving, departing) {
    return fetch(`${baseUrl}/api/v1/hospitals/${_id}/appointments`, {
      method: "POST",
      body: JSON.stringify({
        "arriving": arriving,
        "departing": departing
      } 
      ),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      // .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error updating the booking. Please try again.");
      });
  }, 

  put(token, booking) {
    const { _id, hospital, ...rest } = booking;
  
    const cleanedBooking = {
      ...rest,
      hospital: hospital._id, 
    };
  
    console.log("PUT URL:", `${url}/${_id}`);
    console.log("PUT BODY:", JSON.stringify(cleanedBooking));
    console.log("Authorization:", `Bearer ${token}`);
  
    return fetch(`${url}/${_id}`, {
      method: "PUT",
      body: JSON.stringify(cleanedBooking),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log("log client error", error);
        throw new Error("There was an error updating the booking. Please try again.");
      });
  },
  

  delete(_id, token) {
    return fetch(`${url}/${_id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      console.log("log client error " + error);
      throw new Error("There was an error updating the booking. Please try again.");
    });
  }
};

export { bookingAPI };

import { Campground } from "./Campground"; // (you'll rename Project.js to Campground.js later)

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/campgrounds`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the campground(s).";
    default:
      return "There was an error retrieving the campground(s). Please try again.";
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

function convertToCampgroundModels(data) {
  return data.map(convertToCampgroundModel);
}

function convertToCampgroundModel(item) {
  return new Campground(item);
}

const campgroundAPI = {
  get(page = 1, limit = 10) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToCampgroundModels)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the campgrounds. Please try again.");
      });
  },

  find(id) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToCampgroundModel);
  },

  put(campground) {
    return fetch(`${url}/${campground.id}`, {
      method: "PUT",
      body: JSON.stringify(campground),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error updating the campground. Please try again.");
      });
  },
};

export { campgroundAPI };

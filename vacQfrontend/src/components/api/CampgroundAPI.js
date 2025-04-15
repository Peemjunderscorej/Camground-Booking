import { Campground } from "../construnctor/Campground"; // (you'll rename Project.js to Campground.js later)

const baseUrl = "http://localhost:5000";
const url = `${baseUrl}/api/v1/hospitals`;

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
  // console.log("data in camgroundAPI is :",data)
  return data.data.map(convertToCampgroundModel);
}

function convertToCampgroundModel(item) {
  //  console.log("convert to campround model : ",new Campground(item))
  return new Campground(item);
}

function extractData(data){
  return data.data
}

const campgroundAPI = {
  get(page = 1, searchText, limit = 10) {
    let apiUrl = `${url}?page=${page}&limit=${limit}&sort=name`

    if(searchText) {
      apiUrl += `&name=${searchText}`
    }

    console.log('fetch url : ', apiUrl)
    return fetch(apiUrl)
      // .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToCampgroundModels)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the campgrounds. Please try again.");
      });
  },

  find(id) {
    console.log("fetch at : ",`${url}/${id}`)
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(extractData)
      .then(convertToCampgroundModel)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the campgrounds. Please try again.");
      });
  },

  put(campground) {
    return fetch(`${url}/${campground.id}`, {
      method: "PUT",
      body: JSON.stringify(campground),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log("log client error " + error);
        throw new Error("There was an error updating the campground. Please try again.");
      });
  },
};

export { campgroundAPI };

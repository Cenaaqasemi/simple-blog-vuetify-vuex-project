// * Validate and Check api before call it

// * get json that check 3 keys of response object

export const validateUser = (data) => {
  return (
    Array.isArray(data) &&
    data.every((user) => user.id && user.name)
  );
};

// * Rate Limiting and Retry Logic Specifies How much time request capable to Retry if there is problem

export const fetchRetryLimited = async (url, options, retries = 3) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const request = await fetch(url, options);
      switch (request.status) {
        case 200:
          return request;
        case 404:
          throw new Error("404 - Resource Not Found");
        case 500:
          throw new Error("Internal Server Error");
        default:
          if (!request.ok) {
            throw new Error(`HTTP Error! status : ${request.status}`);
          }
      }
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
};

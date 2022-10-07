const config = {
  apiUrl: "http://localhost:8000/api/",
  getHeaders: (token, bearer) => {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return { headers: headers };
  },
};

export default config;

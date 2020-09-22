export default {
  async getUserToken() {
    const result = await fetch(
      "http://demo.mcs.gov.kh/wp-json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD,
        }),
      }
    ).then((res) => res.json());
    return result.token;
  },
  async fetchMeeting(token, endDateISO) {
    if (token) {
      let url =
        "http://demo.mcs.gov.kh/wp-json/wp/v2/posts?_fields=date,acf,title&orderby=date&order=asc&status=publish,future";
      url +=
        "&after=" +
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            60 * 7 * 60 * 1000
        ).toISOString();
      //   console.log(new Date().toISOString())
      if (endDateISO) {
        url += "&before=" + endDateISO;
      }
      return await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => res.json());
    }
  },
};

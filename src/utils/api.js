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
  async getFirstYear() {
    let url =
      "http://demo.mcs.gov.kh/wp-json/wp/v2/posts?_fields=date&orderby=date&order=asc&status=publish&per_page=1";
    const data=  await fetch(url).then((res) => res.json());
    return new Date(data[0].date).getFullYear();
  },
  async fetchMeeting(token, endDateISO, startDateISO, limit) {
    // let startDate =
    //   startDateISO ||
    //   new Date(
    //     new Date(new Date().toLocaleDateString()).getTime() + 60 * 7 * 60 * 1000
    //   ).toISOString();
    let startDate =
      startDateISO ||
      new Date(
        new Date(new Date().toLocaleDateString()).getTime() + 60 * 2 * 60 * 1000
      ).toISOString();
    let totalPage = 0;
    let returnMeetings = [];
    if (token) {
      let url =
        "http://demo.mcs.gov.kh/wp-json/wp/v2/posts?_fields=date,acf,title&orderby=date&order=asc&status=publish,future&per_page=" +
        (limit || 100);
      url += "&after=" + startDate;
      if (endDateISO) {
        url += "&before=" + endDateISO;
      }

      const fetchedMeeting = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        totalPage = res.headers.get("x-wp-totalpages");
        return res.json();
      });

      if (totalPage > 1 && !limit) {
        for (let i = 2; i <= totalPage; i++) {
          const moreMeeting = await fetch(`${url}&page=${i}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then((res) => res.json());
          returnMeetings.push(...moreMeeting);
        }
      }
      returnMeetings.push(...fetchedMeeting);
    }
    console.log(returnMeetings);
    return returnMeetings;
  },
};

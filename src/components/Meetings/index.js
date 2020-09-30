import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import khmerConverter from "../../utils/convertToKhmer";
import Loading from "../Layout/Loading";
import DisplayDate from "../Shared/DisplayDate";

/*
Todo :
  -styling
  -render latest year 
  -jump to current meeting

*/

export class MeetingAll extends Component {
  state = {
    meeting: [],
    loading: true,
    selectedYear: new Date().getFullYear(),
    selectedMonth: "month" + new Date().getMonth(),
    year: [],
  };
  componentDidMount = async () => {
    this.token = await api.getUserToken();
    const allYear = [];
    const firstYear = await api.getFirstYear();
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= currentYear - firstYear; i++) {
      allYear.push(firstYear + i);
    }
    this.setState({
      year: allYear,
    });
    if (this.token) {
      const meetings = await api.fetchMeeting(
        this.token,
        new Date(this.state.selectedYear + 1, 0, 0).toISOString(),
        new Date(this.state.selectedYear, 0, 0).toISOString()
      );
      this.setState({
        meeting: meetings,
        loading: false,
      });
    }
  };
  componentDidUpdate = async () => {
    const selectedElement = document.querySelector(
      "#" + this.state.selectedMonth
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  changeSelectedMonth = (e) => {
    this.setState({
      selectedMonth: e.target.value,
    });
  };

  changeSelectedYear = async (e) => {
    this.setState({
      selectedYear: e.target.value,
      loading: true,
    });
    if (this.token) {
      const meetings = await api.fetchMeeting(
        this.token,
        new Date(+e.target.value + 1, 0, 0).toISOString(),
        new Date(+e.target.value, 0, 0).toISOString()
      );
      this.setState({
        meeting: meetings,
        loading: false,
      });
    }
  };
  render() {
    const khmerMonth = [
      "មករា",
      "កុម្ភៈ",
      "មីនា",
      "មេសា",
      "ឧសភា",
      "មិថុនា",
      "កក្កដា",
      "សីហា",
      "កញ្ញា",
      "តុលា",
      "វិច្ឆិកា",
      "ធ្នូ",
    ];

    const existedMonth = [];
    return (
      <div
        className="container"
        style={{
          fontFamily: '"Hanuman", serif',
        }}
      >
        <Link to="/">
          {" "}
          <h1>Home Page</h1>
        </Link>
        <div className="row">
          <div className="w-100">
            <div className="filterContainer d-flex flex-center justify-content-center align-items-center mb-4">
              <div className="" style={{ flex: 1 }}>
                <div className="m-2">
                  <div className="d-flex ">
                    <h4 className="mt-1 mr-2">ខែ៖</h4>
                    <select
                      className="custom-select mr-md-2"
                      onChange={this.changeSelectedMonth}
                      value={this.state.selectedMonth}
                    >
                      {khmerMonth.map((v, i) => {
                        return (
                          <option key={i} value={"month" + i}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="" style={{ flex: 1 }}>
                <div className="m-2">
                  <div className="d-flex">
                    <h4 className="mt-1 mr-2">ឆ្នាំ៖</h4>

                    <select
                      className="custom-select"
                      onChange={this.changeSelectedYear}
                      value={this.state.selectedYear}
                    >
                      {this.state.year.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {this.state.loading && <Loading />}
            {!this.state.loading &&
              this.state.meeting.length > 0 &&
              this.state.meeting.map((v, i) => {
                let idMonth = null;
                let monthMeeting = new Date(v.date).getMonth();
                if (existedMonth.indexOf(monthMeeting) < 0) {
                  existedMonth.push(monthMeeting);
                  idMonth = monthMeeting;
                }
                return (
                  <div key={i} id={idMonth ? "month" + idMonth : null}>
                    <div className=" px-2 d-flex flex-row justify-content-center ">
                      <div className="mt-1">
                        <DisplayDate date={v.date} />
                      </div>
                      <div className="card-body py-1">
                        <h5
                          className="card-title mb-1"
                          style={{
                            cursor: "pointer",
                            lineHeight: "30px",
                          }}
                          data-toggle="modal"
                          data-target={"#exampleModal" + i}
                        >
                          {v.title.rendered}
                        </h5>
                        <p className="card-text">
                          {khmerConverter.dateToKhmer(v.date).timeKhmer}
                        </p>
                      </div>
                    </div>

                    <div
                      className="modal fade mt-5"
                      id={"exampleModal" + i}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby={"exampleModalLabel" + i}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id={"exampleModalLabel" + i}
                            >
                              ព័ត៌មានលំអិតនៃការប្រជុំ
                            </h5>
                            <button
                              type="button"
                              className="close red"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul
                              className="nav nav-tabs"
                              id={"myTab" + i}
                              role="tablist"
                            >
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  id={"home-tab" + i}
                                  data-toggle="tab"
                                  href={"#home" + i}
                                  role="tab"
                                  aria-controls="home"
                                  aria-selected="true"
                                >
                                  ការប្រជុំ
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  id={"download-tab" + i}
                                  data-toggle="tab"
                                  href={"#download" + i}
                                  role="tab"
                                  aria-controls="download"
                                  aria-selected="false"
                                >
                                  ទាញយក
                                </a>
                              </li>
                              {/* <li className="nav-item">
                                <a
                                  className="nav-link"
                                  id={"commitee-tab" + i}
                                  data-toggle="tab"
                                  href={"#commitee" + i}
                                  role="tab"
                                  aria-controls="commitee"
                                  aria-selected="false"
                                >
                                   Committee/Council
                                </a>
                              </li> */}
                            </ul>
                            <div className="tab-content" id="myTabContent">
                              <div
                                className="  tab-pane fade show active mx-3"
                                id={"home" + i}
                                role="tabpanel"
                                aria-labelledby="home-tab"
                              >
                                <br />
                                <h4>
                                  <span style={{ fontWeight: "bold" }}>
                                    កម្មវត្ថុ៖
                                  </span>{" "}
                                  {v.title.rendered}
                                </h4>
                                <hr />
                                <h4>
                                  <span style={{ fontWeight: "bold" }}>
                                    កាលបរិចេ្ឆទ៖
                                  </span>{" "}
                                
                                  {khmerConverter.dateToKhmer(v.date).fullKhmerDateTime}
                                </h4>
                                <hr />
                                <h4>
                                  <span style={{ fontWeight: "bold" }}>
                                    ទីតាំង៖
                                  </span>{" "}
                                  {v.acf.room}
                                </h4>
                                <hr />

                                <h4>
                                  <span style={{ fontWeight: "bold" }}>
                                    ដឹកនាំដោយ៖
                                  </span>{" "}
                                  {v.acf.leader +
                                    " " +
                                    v.acf.position.join(" ")}
                                </h4>
                              </div>
                              <div
                                className=" tab-pane fade"
                                id={"download" + i}
                                role="tabpanel"
                                aria-labelledby="download-tab"
                              >
                                <br />
                                <h4 className="mx-3">
                                  មិនមានឯកសារណាមួយត្រូវបានបញ្ចូលសម្រាប់កិច្ចប្រជុំនេះទេ។
                                </h4>
                              </div>
                              {/* <div
                                className="tab-pane fade"
                                id={"commitee" + i}
                                role="tabpanel"
                                aria-labelledby="commitee-tab"
                              >
                                 {v.acf.leader}
                              </div> */}
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              បិទ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default MeetingAll;

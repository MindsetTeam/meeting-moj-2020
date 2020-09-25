import React, { Component } from "react";
import {Link} from "react-router-dom"
import api from "../../utils/api";
import Loading from "../Layout/Loading"


/*
Todo :
  -styling
  -render latest year 
  -jump to current meeting

*/

export class MeetingAll extends Component {
  state = {
    meeting: [],
    loading: true
  };
  componentDidMount = async () => {
    // const now = new Date();
    // const endDateMeeting = new Date(now.getFullYear(), now.getMonth() + 1);
    const token = await api.getUserToken();
    if (token) {
      const meetings = await api.fetchMeeting(
        token,
        new Date(new Date().getFullYear()+1,0,0).toISOString(),
        new Date(new Date().getFullYear(),0,0).toISOString(),
      );
      this.setState({
        meeting: meetings,
        loading: false
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
      <div className="container">
       <Link to="/"> <h1>Home Page</h1></Link>
        <div className="row">
          <div className="col-md-8">
          {this.state.loading && <Loading />}
            {!this.state.loading&& (this.state.meeting.length>0)&&this.state.meeting.map((v, i) => {
              let idMonth = null;
              let monthMeeting = new Date(v.date).getMonth()
              if(existedMonth.indexOf(monthMeeting)<0){
                existedMonth.push(monthMeeting);
                idMonth = monthMeeting
              }
              return (
                <div key={i} id={"month"+idMonth}>
                  <div
                    className="card"
                    data-toggle="modal"
                    data-target={"#exampleModal" + i}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{v.title.rendered}</h5>
                      <p className="card-text">{new Date(v.date).toLocaleString()}</p>
                    </div>
                  </div>

                  <div
                    className="modal fade"
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
                            Modal title
                          </h5>
                          <button
                            type="button"
                            className="close"
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
                                Home
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id={"profile-tab" + i}
                                data-toggle="tab"
                                href={"#profile" + i}
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Profile
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id={"contact-tab" + i}
                                data-toggle="tab"
                                href={"#contact" + i}
                                role="tab"
                                aria-controls="contact"
                                aria-selected="false"
                              >
                                Contact
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id={"home" + i}
                              role="tabpanel"
                              aria-labelledby="home-tab"
                            >
                              {v.acf.leader}
                            </div>
                            <div
                              className="tab-pane fade"
                              id={"profile" + i}
                              role="tabpanel"
                              aria-labelledby="profile-tab"
                            >
                              hi brother
                            </div>
                            <div
                              className="tab-pane fade"
                              id={"contact" + i}
                              role="tabpanel"
                              aria-labelledby="contact-tab"
                            >
                              what
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            {khmerMonth.map((v, i) => {
              return (
                <h4 key={i}>
                  <a href={"#month" + i}>{v}</a>
                </h4>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MeetingAll;

import React from "react";
import logo from "./asset/logo.png";
import "./App.css";
import api from "./utils/api";

const mapNumber = {
  0: "០",
  1: "១",
  2: "២",
  3: "៣",
  4: "៤",
  5: "៥",
  6: "៦",
  7: "៧",
  8: "៨",
  9: "៩",
};

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

const khmerDay = [
  "អាទិត្យ",
  "ច័ន្ទ",
  "អង្គារ",
  "ពុធ",
  "ព្រហស្បតិ៍",
  "សុក្រ",
  "សៅរ៍",
];
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.dateRef = React.createRef();
    this.timeRef = React.createRef();
    this.marqueeRef = React.createRef();
    this.meetingRef = React.createRef();
    this.token = "";
    this.state = {
      loading: true,
      meeting: [],
      date: "today",
    };
  }

  async componentDidUpdate() {
    clearInterval(this.intervalFetch);
    this.intervalFetch = setInterval(async () => {
      await this.fetchMeeting(this.state.date);
    }, 6000);
  }

  async componentDidMount() {
    this.dateTimeUpdate();
    await this.fetchMeeting(this.state.date);
    // setInterval(async () => {
    //    await this.fetchMeeting(this.state.date);
    // }, 3000);
    // this.animationMeeting();
  }

  async fetchMeeting(endDate) {
    const now = new Date();
    if (!this.token) {
      this.token = await api.getUserToken();
    }
    let endDateMeeting;
    if (endDate === "today") {
      endDateMeeting = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
    } else if (endDate === "week") {
      const dayToWeekend = 7 - now.getDay();
      endDateMeeting = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + dayToWeekend
      );
    } else if (endDate === "month") {
      endDateMeeting = new Date(now.getFullYear(), now.getMonth() + 1);
    }
    const meeting = await api.fetchMeeting(
      this.token,
      endDateMeeting.toISOString()
    );
    if (JSON.stringify(this.state.meeting) !== JSON.stringify(meeting)) {
      this.setState(
        {
          meeting: [],
        },
        () => {
          clearInterval(this.intervalMeeting);
        }
      );
      this.setState(
        {
          meeting,
          loading: false,
        },
        () => {
          //  clearInterval(this.intervalMeeting);
          this.animationMeeting();
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  animationMeeting() {
    if (this.meetingRef.current.children.length > 5) {
      this.intervalMeeting = setInterval(() => {
        let firstElement = this.meetingRef.current.firstElementChild;
        this.meetingRef.current.children[1].classList.add("animatedDiv");
        this.meetingRef.current.firstElementChild.remove();
        if (firstElement.classList.contains("animatedDiv")) {
          firstElement.className = "meeting";
        }
        this.meetingRef.current.insertAdjacentElement(
          "beforeend",
          firstElement
        );
      }, 12000);
    } else {
      let firstElement = this.meetingRef.current.firstElementChild;
      if (firstElement) {
        firstElement.classList.remove("animatedDiv");
        firstElement.style.marginTop = "0px";
      }
    }
  }

  dateTimeUpdate() {
    setInterval(() => {
      var current = new Date();
      var timeArray = current
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .split(" ");
      let date = ("0" + current.getDate())
        .slice(-2)
        .replace(/[0123456789]/g, (value) => {
          return mapNumber[value];
        });
      let day = khmerDay[current.getDay()];
      let month = khmerMonth[current.getMonth()];
      let year = current
        .getFullYear()
        .toString()
        .replace(/[0123456789]/g, (value) => {
          return mapNumber[value];
        });
      let time = timeArray[0].replace(/[0123456789]/g, (value) => {
        return mapNumber[value];
      });

      this.dateRef.current.textContent = `ថ្ងៃ${day} ទី${date}​ ខែ${month} ឆ្នាំ${year}`;
      this.timeRef.current.textContent = time;
    }, 500);
  }

  toggleFullscreen = (e) => {
    var element = document.body;

    var isFullscreen =
      document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function () {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function () {
        return false;
      };

    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  render() {
    const { loading, meeting } = this.state;
    const meetingRender = meeting?.map((m, i) => {
      let firstClass;
      if (i === 0) firstClass = "meeting animatedDiv";
      else firstClass = "meeting";

      var start = new Date(m.date);
      var timeArray = start
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .split(" ");
      var day = ("0" + start.getDate())
        .slice(-2)
        .replace(/[0123456789]/g, (value) => {
          return mapNumber[value];
        });
      var month = khmerMonth[start.getMonth()];
      var year = start
        .getFullYear()
        .toString()
        .replace(/[0123456789]/g, (value) => {
          return mapNumber[value];
        });
      var time =
        timeArray[0].replace(/[0123456789]/g, (value) => {
          return mapNumber[value];
        }) +
        " " +
        (timeArray[1] === "AM" ? "ព្រឹក" : "ល្ងាច");

      let mObj = (
        <div className={firstClass} key={i}>
          {/* Date Time */}
          <div className="datetime">
            <div className="date">
              <p>
                {day}-{month}-{year}
              </p>
            </div>
            <div className="time">
              <p>{time}</p>
            </div>
          </div>
          {/* Title */}
          <div className="title-container">
            <div className="title">
              <p>
                {" "}
                <span style={{ fontWeight: "bolder" }}>កម្មវត្ថុ៖</span>{" "}
                {m.title.rendered}
              </p>
            </div>
            <div className="info">
              <p>
                <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                <span>{m.acf.leader}</span>{" "}
                <span>
                  {m.acf.position.length === 1
                    ? m.acf.position
                    : m.acf.position.join(" ")}
                </span>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="location">
            <p>{m.acf.room}</p>
          </div>

          {/* Status */}
          <div className="status">
            <p className="blink">​{i === 0 ? "កំពុងដំណើរការ" : "រង់ចាំ"}</p>
          </div>
        </div>
      );
      return mObj;
    });

    const marqueeRender = meeting?.map((m, i) => {
      let mObj = (
        <p key={i}>
          {(i + 1).toString().replace(/[0123456789]/g, (value) => {
            return mapNumber[value];
          })}
          / {m.title.rendered}
        </p>
      );
      return mObj;
    });
    return (
      <div className="App">
        <div className="AppContainer">
          {/* Header */}
          <header className="App-header">
            <div className="date-container">
              <p className="date-header" ref={this.dateRef}>
                ថ្ងៃអង្គារ ទី០១​ ខែកញ្ញា ឆ្នាំ២០២០
              </p>
              <p>
                ម៉ោង៖{" "}
                <span className="time-header" ref={this.timeRef}>
                  ១១:៣៤
                </span>{" "}
                នាទី
              </p>
            </div>
          </header>

          {/* Content Body */}
          <div className="content-container">
            {/* Content Header */}
            <div className="content-header">
              <h3 className="date-caption">កាលបរិចេ្ឆទ</h3>
              <h3 className="title-caption">ខ្លឹមសារ</h3>
              <h3 className="location-caption">ទីតាំង</h3>
              <h3 className="status-caption">ស្ថានភាព</h3>
            </div>

            {/* Content Body */}
            <div className="content-body">
              {loading && (
                <div className="loading-container">
                  <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                  </div>
                </div>
              )}
              <div className="meetingContainerSelf" ref={this.meetingRef}>
                {!loading && meetingRender}
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer>
          {/* Content Footer */}
          <div className="content-footer">
            <span
              style={{ fontFamily: "Dangrek" }}
              onClick={() => {
                clearInterval(this.intervalMeeting);
                this.setState(
                  {
                    date: "today",
                    loading: true,
                    meeting: null,
                  },
                  () => {
                    this.fetchMeeting(this.state.date);
                  }
                );
              }}
            >
              ថ្ងៃនេះ
            </span>
            <span
              style={{ fontFamily: "Dangrek" }}
              onClick={() => {
                clearInterval(this.intervalMeeting);
                this.setState(
                  {
                    date: "week",
                    loading: true,
                    meeting: null,
                  },
                  () => {
                    this.fetchMeeting(this.state.date);
                  }
                );
              }}
            >
              សប្ដាហ៌
            </span>
            <span
              style={{ fontFamily: "Dangrek" }}
              onClick={() => {
                clearInterval(this.intervalMeeting);
                this.setState(
                  {
                    loading: true,
                    date: "month",
                    meeting: null,
                  },
                  () => {
                    this.fetchMeeting(this.state.date);
                  }
                );
              }}
            >
              ខែនេះ
            </span>

            <div className="navigation">
              <div className="left">
                <i
                  onClick={this.toggleFullscreen}
                  className="fa fa-arrows-alt fullscreen d-lg-inline d-none"
                  aria-hidden="true"
                  style={{
                    fontSize: "20px",
                    color: "#2b6cb0",
                    cursor: "pointer",
                  }}
                ></i>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="marquee">
            <div className="marquee-caption">
              <img
                src={logo}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <h3>
                សរុបកិច្ចប្រជុំ
                {this.state.date === "today"
                  ? "ថ្ងៃ"
                  : this.state.date === "week"
                  ? "សប្តាហ៍"
                  : "ខែ"}
                នេះ មានចំនួន{" "}
                {this.state.meeting?.length
                  .toString()
                  .replace(/[0123456789]/g, (value) => {
                    return mapNumber[value];
                  })}{" "}
                កិច្ចប្រជុំ
              </h3>
            </div>
            <marquee
              ref={this.marqueeRef}
              behavior="scroll"
              direction="left"
              onMouseOver={() => {
                this.marqueeRef.current.stop();
              }}
              onMouseOut={() => {
                this.marqueeRef.current.start();
              }}
            >
              {marqueeRender}
            </marquee>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

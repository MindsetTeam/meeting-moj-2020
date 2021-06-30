import React, { createRef, useEffect, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import logo from "../../asset/logo.png";
import API from "../../utils/api";
import Loading from "../Layout/Loading";

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

const Meeting = () => {
  const {token} = useContext(AuthContext)

  const dateRef = createRef();
  const timeRef = createRef();
  const marqueeRef = createRef();
  const meetingRef = createRef();
  const [loading, setLoading] = useState(true);
  const [meeting, setMeeting] = useState([]);
  const [date, setDate] = useState("today");

  useEffect(() => {
    const dateTimeUpdate = () => {
      return setInterval(() => {
        const current = new Date();
        const timeArray = current
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

        if (dateRef.current && timeRef.current) {
          dateRef.current.textContent = `ថ្ងៃ${day} ទី${date}​ ខែ${month} ឆ្នាំ${year}`;
          timeRef.current.textContent = time;
        }
      }, 1000);
    };
    // start timer
    const timeInterval = dateTimeUpdate();
    return () => {
      clearInterval(timeInterval);
    };
  }, [dateRef, timeRef]);

  const fetchMeeting = useCallback(async (endDate) => {
    const now = new Date();
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
    let resMeetings = await API.fetchMeeting(
      token,
      new Date(endDateMeeting.getTime() + 1000 * 60 * 60 * 7).toISOString()
    );
    resMeetings = resMeetings?.filter(
      (meeting) => new Date(meeting.acf.end_date_time).getTime() > Date.now()
    );
    if (JSON.stringify(meeting) !== JSON.stringify(resMeetings)) {
      setMeeting(resMeetings);
      setState(
        {
          meeting,
          loading: false,
        },
        () => {
          //  clearInterval(intervalMeeting);
          animationMeeting();
        }
      );
    } else {
      setState({
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    let intervalFetch;
    (async () => {
      setLoading(true)
      await fetchMeeting(date).catch(err=>alert(err));
      setLoading(false);
      intervalFetch = setInterval(async () => {
        await fetchMeeting(date);
      }, 6000);
    })();
    return () => {
      clearInterval(intervalFetch);
    };
  }, [date, fetchMeeting]);

  useEffect(() => {
    let intervalMeeting;
    const animationMeeting = () => {
      if (meetingRef.current?.children.length > 5) {
        intervalMeeting = setInterval(() => {
          let firstElement = meetingRef.current.firstElementChild;
          meetingRef.current.children[1].classList.add("animatedDiv");
          meetingRef.current.firstElementChild.remove();
          if (firstElement.classList.contains("animatedDiv")) {
            firstElement.className = "meeting";
          }
          meetingRef.current.insertAdjacentElement("beforeend", firstElement);
        }, 12000);
      } else {
        let firstElement = meetingRef.current.firstElementChild;
        if (firstElement) {
          firstElement.classList.remove("animatedDiv");
          firstElement.style.marginTop = "0px";
        }
      }
    };
    animationMeeting();
    return () => {
      clearInterval(intervalMeeting);
    };
  }, [meeting, meetingRef]);

  const meetingRender = meeting?.map((m, i) => {
    let firstClass = i === 0 ? "meeting animatedDiv" : "meeting";
    const start = new Date(m.date);
    const timeArray = start
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .split(" ");
    const day = ("0" + start.getDate())
      .slice(-2)
      .replace(/[0123456789]/g, (value) => {
        return mapNumber[value];
      });
    const month = khmerMonth[start.getMonth()];
    const year = start
      .getFullYear()
      .toString()
      .replace(/[0123456789]/g, (value) => {
        return mapNumber[value];
      });
    const time =
      timeArray[0].replace(/[0123456789]/g, (value) => {
        return mapNumber[value];
      }) +
      " " +
      (timeArray[1] === "AM" ? "ព្រឹក" : "ល្ងាច");
    return (
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
        <div className="status">
          <p className="blink">
            {m.acf.options === "លើកពេល"
              ? "លើកពេល"
              : new Date(m.date).getTime() - 1000 * 60 * 30 < Date.now() &&
                new Date(m.date).getTime() > Date.now()
              ? "ជិតប្រជុំ"
              : new Date(m.date).getTime() < Date.now()
              ? "កំពុងដំណើរការ"
              : "រង់ចាំ"}
          </p>
        </div>
      </div>
    );
  });

  const marqueeRender = meeting?.map((m, i) => (
    <p key={i}>
      {(i + 1).toString().replace(/[0123456789]/g, (value) => {
        return mapNumber[value];
      })}
      / {m.title.rendered}
    </p>
  ));

  return (
    <div className="App">
      <div className="AppContainer">
        {/* Header */}
        <header className="App-header">
          <div className="date-container">
            <p className="date-header" ref={dateRef}>
              ថ្ងៃអង្គារ ទី០១​ ខែកញ្ញា ឆ្នាំ២០២០
            </p>
            <p>
              ម៉ោង៖{" "}
              <span className="time-header" ref={timeRef}>
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
            {loading && <Loading />}
            <div className="meetingContainerSelf" ref={meetingRef}>
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
              setDate("today");
              setLoading(true);
              setMeeting([]);
            }}
          >
            ថ្ងៃនេះ
          </span>
          <span
            style={{ fontFamily: "Dangrek" }}
            onClick={() => {
              clearInterval(intervalMeeting);
              setState(
                {
                  date: "week",
                  loading: true,
                  meeting: null,
                },
                () => {
                  fetchMeeting(date);
                }
              );
            }}
          >
            សប្ដាហ៌
          </span>
          <span
            style={{ fontFamily: "Dangrek" }}
            onClick={() => {
              setMeeting([]);
              setloading(false);
              setState(
                {
                  loading: true,
                  date: "month",
                  meeting: null,
                },
                () => {
                  fetchMeeting(date);
                }
              );
            }}
          >
            ខែនេះ
          </span>

          <div className="navigation">
            <div className="left">
              <i
                onClick={() => {
                  const element = document.body;

                  const isFullscreen =
                    document.webkitIsFullScreen ||
                    document.mozFullScreen ||
                    false;

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

                  isFullscreen
                    ? document.cancelFullScreen()
                    : element.requestFullScreen();
                }}
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
            <Link to="allMeeting">
              {" "}
              <img
                src={logo}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </Link>
            <h3>
              សរុបកិច្ចប្រជុំ
              {date === "today" ? "ថ្ងៃ" : date === "week" ? "សប្តាហ៍" : "ខែ"}
              នេះ មានចំនួន{" "}
              {meeting?.length.toString().replace(/[0123456789]/g, (value) => {
                return mapNumber[value];
              })}{" "}
              កិច្ចប្រជុំ
            </h3>
          </div>
          <marquee
            ref={marqueeRef}
            behavior="scroll"
            direction="left"
            onMouseOver={() => {
              marqueeRef.current.stop();
            }}
            onMouseOut={() => {
              marqueeRef.current.start();
            }}
          >
            {marqueeRender}
          </marquee>
        </div>
      </footer>
    </div>
  );
};

export default Meeting;

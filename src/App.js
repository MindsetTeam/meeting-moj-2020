import React from "react";
import logo from "./asset/logo.png";
import "./App.css";

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
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
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

    if (this.meetingRef.current.children.length > 5) {
      setInterval(() => {
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
      }, 3000);
    } else {
      let firstElement = this.meetingRef.current.firstElementChild;
      if (firstElement) {
        firstElement.classList.remove("animatedDiv");
        firstElement.style.marginTop = "0px";
      }
    }
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
    const { loading } = this.state;
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
                  09:30
                </span>{" "}
                នាទី
              </p>
            </div>
          </header>

          {/* Content Body */}
          <div className="content-container">
            {/* Content Header */}
            <div className="content-header" style={{ marginBottom: "3px" }}>
              <h3
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontFamily: "Kdam Thmor",
                }}
              >
                កម្មវិធីប្រជុំ
              </h3>
            </div>

            <div className="content-header">
              <h3 className="date-caption">កាលបរិចេ្ឆទ</h3>
              <h3 className="title-caption">ខ្លឹមសារ</h3>
              <h3 className="location-caption">ទីតាំង</h3>
              <h3 className="status-caption">ស្ថានភាព</h3>
            </div>

            {/* Content Body */}

            <div className="content-body" ref={this.meetingRef}>
              <div className="meeting animatedDiv">
                {/* Date Time */}
                <div className="datetime">
                  <div className="date">
                    <p>០៩-កញ្ញា-២០២០</p>
                  </div>
                  <div className="time">
                    <p>០៧:០០ ព្រឹក</p>
                  </div>
                </div>
                {/* Title */}
                <div className="title-container">
                  <div className="title">
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bolder" }}>
                        កម្មវត្ថុ៖
                      </span>{" "}
                      កិច្ចប្រជុំក្រុមការងាររាជរដ្ឋាភិបាល ពិនិត្យលើសំណើ
                      របស់សង្គមស៊ីវិល
                      ស្នើសុំធ្វើវិសោធនកម្មច្បាប់ស្តីពីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                      <span>ឯកឧត្តម ជិន ម៉ាលីន</span>{" "}
                      <span>
                        រដ្ឋលេខាធិការ និងជាអ្នកនាំពាក្យក្រសួងយុត្តិធម៌
                      </span>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="location">
                  <p>ទីស្តីការក្រសួង (បន្ទប់ ក)</p>
                </div>

                {/* Status */}
                <div className="status">
                  <p className="blink">​ កំពុងដំណើរការ</p>
                </div>
              </div>

              <div className="meeting">
                {/* Date Time */}
                <div className="datetime">
                  <div className="date">
                    <p>០៩-កញ្ញា-២០២០</p>
                  </div>
                  <div className="time">
                    <p>០៧:០០ ព្រឹក</p>
                  </div>
                </div>
                {/* Title */}
                <div className="title-container">
                  <div className="title">
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bolder" }}>
                        កម្មវត្ថុ៖
                      </span>{" "}
                      កិច្ចប្រជុំក្រុមការងាររាជរដ្ឋាភិបាល ពិនិត្យលើសំណើ
                      របស់សង្គមស៊ីវិល
                      ស្នើសុំធ្វើវិសោធនកម្មច្បាប់ស្តីពីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                      <span>ឯកឧត្តម ជិន ម៉ាលីន</span>{" "}
                      <span>
                        រដ្ឋលេខាធិការ និងជាអ្នកនាំពាក្យក្រសួងយុត្តិធម៌
                      </span>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="location">
                  <p>ទីស្តីការក្រសួង (បន្ទប់ ក)</p>
                </div>

                {/* Status */}
                <div className="status">
                  <p className="blink">​ កំពុងដំណើរការ</p>
                </div>
              </div>

              <div className="meeting">
                {/* Date Time */}
                <div className="datetime">
                  <div className="date">
                    <p>០៩-កញ្ញា-២០២០</p>
                  </div>
                  <div className="time">
                    <p>០៧:០០ ព្រឹក</p>
                  </div>
                </div>
                {/* Title */}
                <div className="title-container">
                  <div className="title">
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bolder" }}>
                        កម្មវត្ថុ៖
                      </span>{" "}
                      កិច្ចប្រជុំក្រុមការងាររាជរដ្ឋាភិបាល ពិនិត្យលើសំណើ
                      របស់សង្គមស៊ីវិល
                      ស្នើសុំធ្វើវិសោធនកម្មច្បាប់ស្តីពីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                      <span>ឯកឧត្តម ជិន ម៉ាលីន</span>{" "}
                      <span>
                        រដ្ឋលេខាធិការ និងជាអ្នកនាំពាក្យក្រសួងយុត្តិធម៌
                      </span>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="location">
                  <p>ទីស្តីការក្រសួង (បន្ទប់ ក)</p>
                </div>

                {/* Status */}
                <div className="status">
                  <p className="blink">​ កំពុងដំណើរការ</p>
                </div>
              </div>

              <div className="meeting">
                {/* Date Time */}
                <div className="datetime">
                  <div className="date">
                    <p>០៩-កញ្ញា-២០២០</p>
                  </div>
                  <div className="time">
                    <p>០៧:០០ ព្រឹក</p>
                  </div>
                </div>
                {/* Title */}
                <div className="title-container">
                  <div className="title">
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bolder" }}>
                        កម្មវត្ថុ៖
                      </span>{" "}
                      កិច្ចប្រជុំក្រុមការងាររាជរដ្ឋាភិបាល ពិនិត្យលើសំណើ
                      របស់សង្គមស៊ីវិល
                      ស្នើសុំធ្វើវិសោធនកម្មច្បាប់ស្តីពីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                      <span>ឯកឧត្តម ជិន ម៉ាលីន</span>{" "}
                      <span>
                        រដ្ឋលេខាធិការ និងជាអ្នកនាំពាក្យក្រសួងយុត្តិធម៌
                      </span>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="location">
                  <p>ទីស្តីការក្រសួង (បន្ទប់ ក)</p>
                </div>

                {/* Status */}
                <div className="status">
                  <p className="blink">​ កំពុងដំណើរការ</p>
                </div>
              </div>

              <div className="meeting">
                {/* Date Time */}
                <div className="datetime">
                  <div className="date">
                    <p>០៩-កញ្ញា-២០២០</p>
                  </div>
                  <div className="time">
                    <p>០៧:០០ ព្រឹក</p>
                  </div>
                </div>
                {/* Title */}
                <div className="title-container">
                  <div className="title">
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bolder" }}>
                        កម្មវត្ថុ៖
                      </span>{" "}
                      កិច្ចប្រជុំក្រុមការងាររាជរដ្ឋាភិបាល ពិនិត្យលើសំណើ
                      របស់សង្គមស៊ីវិល
                      ស្នើសុំធ្វើវិសោធនកម្មច្បាប់ស្តីពីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                      <span>ឯកឧត្តម ជិន ម៉ាលីន</span>{" "}
                      <span>
                        រដ្ឋលេខាធិការ និងជាអ្នកនាំពាក្យក្រសួងយុត្តិធម៌
                      </span>
                    </p>
                  </div>
                </div>
                {/* Location */}
                <div className="location">
                  <p>ទីស្តីការក្រសួង (បន្ទប់ ក)</p>
                </div>

                {/* Status */}
                <div className="status">
                  <p className="blink">​ កំពុងដំណើរការ</p>
                </div>
              </div>

              <div className="meeting">
                {/* Date Time */}
                <div className="datetime">
                  <div className="date">
                    <p>០៩-កញ្ញា-២០២០</p>
                  </div>
                  <div className="time">
                    <p>០៧:០០ ព្រឹក</p>
                  </div>
                </div>
                {/* Title */}
                <div className="title-container">
                  <div className="title">
                    <p>
                      {" "}
                      <span style={{ fontWeight: "bolder" }}>
                        កម្មវត្ថុ៖
                      </span>{" "}
                      កិច្ចប្រជុំក្រុមការងាររាជរដ្ឋាភិបាល ពិនិត្យលើសំណើ
                      របស់សង្គមស៊ីវិល
                      ស្នើសុំធ្វើវិសោធនកម្មច្បាប់ស្តីពីសមាគមនិងអង្គការមិនមែនរដ្ឋាភិបាល
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <span style={{ fontWeight: "bolder" }}>ដឹកនាំដោយ៖</span>{" "}
                      <span>ឯកឧត្តម ជិន ម៉ាលីន</span>{" "}
                      <span>
                        រដ្ឋលេខាធិការ និងជាអ្នកនាំពាក្យក្រសួងយុត្តិធម៌
                      </span>
                    </p>
                  </div>
                </div>
                {/* Location */}
                <div className="location">
                  <p>ទីស្តីការក្រសួង (បន្ទប់ ក)</p>
                </div>

                {/* Status */}
                <div className="status">
                  <p className="blink">​ កំពុងដំណើរការ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer>
          {/* Content Footer */}
          <div className="content-footer">
            <span style={{ fontFamily: "Dangrek" }}>ថ្ងៃនេះ</span>
            <span style={{ fontFamily: "Dangrek" }}>សប្ដាហ៌</span>
            <span style={{ fontFamily: "Dangrek" }}>ខែនេះ</span>

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
              <h3>សរុបកិច្ចប្រជុំថ្ងៃនេះ មានចំនួន 2 កិច្ចប្រជុំ</h3>
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
              <p>hi123123</p>
              <p>hi123123</p>
            </marquee>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

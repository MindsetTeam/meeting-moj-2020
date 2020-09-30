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

export default {
  numberToKhmer(num) {
    return num.replace(/[0123456789]/g, (value) => {
      return mapNumber[value];
    });
  },

  dateToKhmer(passDated) {
    const passDate = new Date(passDated)
    const timeArray = passDate
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .split(" ");
    const dateNum = this.numberToKhmer(("0" + passDate.getDate()).slice(-2));
    const day = khmerDay[passDate.getDay()];
    const month = khmerMonth[passDate.getMonth()];
    const year = this.numberToKhmer(passDate.getFullYear().toString());

    const timeKhmer =
      this.numberToKhmer(timeArray[0]) +
      " " +
      (timeArray[1] === "AM" ? "ព្រឹក" : "ល្ងាច");
      // `  ថ្ងៃពុធ ទី៣០​ ខែកញ្ញា ឆ្នាំ២០២០

      // ម៉ោង៖ ១១:០២ នាទី`
    return {
      fullKhmerDateTime: `ថ្ងៃ${day} ទី${dateNum} ខែ${month} ឆ្នាំ${year} ម៉ោង៖ ${timeKhmer}`,
      dateNum,
      day,
      month,
      year,
      timeKhmer,
    };
  },
};

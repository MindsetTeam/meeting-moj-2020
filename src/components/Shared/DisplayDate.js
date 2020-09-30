import React from 'react'
import styles from "./DisplayDate.module.css"

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

export default function DisplayDate(props) {
  const date = new Date(props.date);
  const khmerFullWeekName = khmerDay[date.getDay()];
  const khmerMonthName = khmerMonth[date.getMonth()];
  const numberDate = date.getDate();
  
  return (
    <div className={styles['date-container']}>
      {khmerFullWeekName}
      <br/>
      {numberDate}
      <span>{khmerMonthName}</span>
    </div>
  )
}

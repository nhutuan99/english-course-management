// Month name
const monthNames = {
  vi: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}

// Weekdays
const weekdays = {
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  vi: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ({ app }, inject) {
  inject('Date', {
    getTime(date) {
      const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes()
      const hours = date.getHours()
      return `${hours}:${minutes}`
    },
    shortDate(date, separate = '/') {
      const dateArray = this.getExtract(date)
      return `${dateArray[2]}${separate}${dateArray[1]}${separate}${dateArray[0]}`
    },
    now() {
      return Math.floor(new Date().getTime() / 1000)
    },
    getWeekday(date, locale = 'vi') {
      if (!weekdays[locale]) locale = 'vi'
      return weekdays[locale][date.getDay()]
    },
    getMonthName(date, locale = 'vi') {
      if (!monthNames[locale]) locale = 'vi'
      return monthNames[locale][date.getMonth()]
    },
    getExtract(date) {
      return date
        .toISOString()
        .split(/[^0-9]/)
        .slice(0, -1)
    },
  })
}

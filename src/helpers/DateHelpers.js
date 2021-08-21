export const months = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
];

export const weekDays = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export class DateHelpers {
	static getDaysFromMonth(month, year) {
		const date = new Date(year, month, 1);
		const days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	static getStartFillerDates(firstDay) {
		const day = firstDay.getDay();
		const weekDay = day <= 0 ? weekDays[weekDays.length - 1] : weekDays[day - 1];

		if (weekDay === weekDays[0]) {
			return [];
		}

		const days = [];

		for (let i = 0; i < weekDays.indexOf(weekDay); i++) {
			days.unshift(new Date(firstDay.getTime() - DAY_IN_MILLISECONDS * (i + 1)));
		}

		return days;
	}

	static getEndFillerDates(lastDay, amount) {
		let nextMonth = lastDay.getMonth() + 1;
		if (nextMonth >= months.length) nextMonth = 0;

		let year = lastDay.getFullYear();
		if (nextMonth <= 0) year += 1;

		return this.getDaysFromMonth(nextMonth, year).slice(0, amount);
	}
}

export class DateHelpers {
	months = [
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

	weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

	DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

	getDaysFromMonth(month, year) {
		const date = new Date(year, month, 1);
		const days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	getStartFillerDates(firstDay) {
		const day = firstDay.getDay();
		const weekDay =
			day - 1 <= 0 ? this.weekDays[this.weekDays.length - 1] : this.weekDays[day - 1];
		const days = [];
		for (let i = this.weekDays.indexOf(weekDay) - 1; i >= 0; i--) {
			days.push(new Date(firstDay.getTime() - this.DAY_IN_MILLISECONDS * i - 1));
		}
		return days;
	}

	getEndFillerDates(lastDay) {
		const day = lastDay.getDay();
		const weekDay =
			day - 1 <= 0 ? this.weekDays[this.weekDays.length - 1] : this.weekDays[day - 1];
		const days = [];
		let i = this.weekDays.indexOf(weekDay);
		while (this.weekDays[i] !== this.weekDays[this.weekDays.length - 1]) {
			days.push(new Date(lastDay.getTime() - this.DAY_IN_MILLISECONDS * i - 1));
			i++;
		}
		return days;
	}
}

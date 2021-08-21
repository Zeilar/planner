import classNames from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { DateHelpers, months } from "../helpers/DateHelpers";

export default function Calendar() {
	const now = new Date();

	const [month, setMonth] = useState(now.getMonth());
	const [year, setYear] = useState(now.getFullYear());

	const days = DateHelpers.getDaysFromMonth(month, year);
	const fillerDaysStart = DateHelpers.getStartFillerDates(days[0]);
	const fillerDaysEnd = DateHelpers.getEndFillerDates(days[days.length - 1]);

	function isToday(date) {
		const now = new Date();
		return (
			date.getFullYear() === now.getFullYear() &&
			date.getMonth() === now.getMonth() &&
			date.getDate() === now.getDate()
		);
	}

	function nextMonth() {
		if (month >= months.length - 1) {
			setYear(year => year + 1);
			setMonth(0);
		} else {
			setMonth(month => month + 1);
		}
	}

	function previousMonth() {
		if (month <= 0) {
			setYear(year => year - 1);
			setMonth(months.length - 1);
		} else {
			setMonth(month => month - 1);
		}
	}

	return (
		<Container>
			<MonthButtons>
				<MonthButton onClick={previousMonth}>
					{months[month - 1] ?? months[months.length - 1]}
				</MonthButton>
				<span>
					{months[month]} {year}
				</span>
				<MonthButton onClick={nextMonth}>{months[month + 1] ?? months[0]}</MonthButton>
			</MonthButtons>
			<Days>
				{fillerDaysStart.map((day, i) => (
					<FillerDay className={classNames({ active: isToday(day) })} key={i}>
						<DayNumber>{dayjs(day).format("DD dddd")}</DayNumber>
					</FillerDay>
				))}
				{days.map((day, i) => (
					<Day className={classNames({ active: isToday(day) })} key={i}>
						<DayNumber>{dayjs(day).format("DD dddd")}</DayNumber>
					</Day>
				))}
				{fillerDaysEnd.map((day, i) => (
					<FillerDay className={classNames({ active: isToday(day) })} key={i}>
						<DayNumber>{dayjs(day).format("DD dddd")}</DayNumber>
					</FillerDay>
				))}
			</Days>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(7 * 150px);
`;

const MonthButtons = styled.div`
	display: flex;
	color: rgb(var(--accent));
	font-size: 1.5rem;
`;

const MonthButton = styled.button`
	text-transform: uppercase;
	color: rgb(var(--accent));
	background: none;
	font-weight: 900;
	border: 0;
`;

const Days = styled.div`
	display: grid;
	width: calc(7 * 150px);
	grid-template-columns: repeat(7, 1fr);
	grid-gap: 2px;
`;

const Day = styled.div`
	display: flex;
	background-color: rgb(30, 30, 30);
	height: 150px;
	cursor: pointer;
	user-select: none;
	position: relative;
	&.active {
		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 4px;
			background-color: rgb(var(--accent));
		}
	}
	&:hover {
		background-color: rgb(35, 35, 35);
	}
`;

const DayNumber = styled.span`
	margin-left: 0.75rem;
	margin-top: 0.75rem;
	color: rgb(var(--accent));
`;

const FillerDay = styled(Day)`
	background-color: rgb(20, 20, 20);
	${DayNumber} {
		color: rgb(150, 150, 150);
	}
`;

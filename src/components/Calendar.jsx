import classNames from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { DateHelpers, months } from "../helpers/DateHelpers";
import Modal from "./Modal";

export default function Calendar() {
	const now = new Date();

	const [month, setMonth] = useState(now.getMonth());
	const [year, setYear] = useState(now.getFullYear());
	const [modalOpen, setModalOpen] = useState(false);
	const [modalDate, setModalDate] = useState();

	const days = DateHelpers.getDaysFromMonth(month, year),
		fillerDaysStart = DateHelpers.getEndOfPreviousMonth(days[0]),
		fillerDaysEnd = DateHelpers.getStartOfNextMonth(
			days[days.length - 1],
			42 - days.length - fillerDaysStart.length
		);

	function openModal(date) {
		setModalDate(date);
		setModalOpen(true);
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
			{modalOpen && <Modal date={modalDate} close={() => setModalOpen(false)} />}
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
					<FillerDay
						className={classNames({ active: DateHelpers.isToday(day) })}
						onClick={() => openModal(day)}
						key={i}
					>
						<DayNumber>{dayjs(day).format("DD")}</DayNumber>
					</FillerDay>
				))}
				{days.map((day, i) => (
					<Day
						className={classNames({ active: DateHelpers.isToday(day) })}
						onClick={() => openModal(day)}
						key={i}
					>
						<DayNumber>{dayjs(day).format("DD")}</DayNumber>
					</Day>
				))}
				{fillerDaysEnd.map((day, i) => (
					<FillerDay
						className={classNames({ active: DateHelpers.isToday(day) })}
						onClick={() => openModal(day)}
						key={i}
					>
						<DayNumber>{dayjs(day).format("DD")}</DayNumber>
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

const DayNumber = styled.span`
	margin-left: 0.75rem;
	margin-top: 0.75rem;
	color: white;
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
		${DayNumber} {
			color: rgb(var(--accent));
		}
	}
	&:hover {
		background-color: rgb(35, 35, 35);
		${DayNumber} {
			color: rgb(var(--accent));
		}
	}
`;

const FillerDay = styled(Day)`
	background-color: rgb(20, 20, 20);
	${DayNumber} {
		color: rgb(150, 150, 150);
	}
`;

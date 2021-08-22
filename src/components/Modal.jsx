import dayjs from "dayjs";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DateHelpers } from "../helpers/DateHelpers";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Modal({ close, date }) {
	const wrapper = useClickOutside(close);

	console.log(date);

	return <Wrapper ref={wrapper}>{DateHelpers.toString(date)}</Wrapper>;
}

const Wrapper = styled.div`
	background-color: red;
	position: fixed;
	top: 0;
	left: 0;
`;

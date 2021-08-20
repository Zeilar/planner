import styled from "styled-components";
import Calendar from "./Calendar";

export default function App() {
	return (
		<Container>
			<Calendar />
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	display: flex;
	color: white;
	flex-direction: column;
	background-color: rgb(15, 15, 15);
	overflow: auto;
`;

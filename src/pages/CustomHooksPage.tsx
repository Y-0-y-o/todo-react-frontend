import {Button} from "@mui/material";
import useLastUpdate from "../customHooks/useLastUpdate";
import {DateTime} from "luxon";
import PageContentBox from "../components/PageContentBox";

export default function CustomHookPage() {
    const [theTimeThatPassed, resetTimer] = useLastUpdate(Date.now());
    const [theTimeThatPassed2, resetTimer2] = useLastUpdate(DateTime.now().toUTC().toMillis());

    try {
        useLastUpdate(new Date(2022, 9, 5, 21, 0, 0, 0).getTime());
    } catch(error) {
        console.log((error as Error).message);
    }

    // Stupid Plain-JS-Date uses month in the range from 0 to 11
    const [theTimeThatPassed4, resetTimer4] = useLastUpdate(new Date(2022, 7, 28, 21, 0, 0, 0).getTime());

    // Better use Luxon-DateTime
    const [theTimeThatPassed5, resetTimer5] = useLastUpdate(DateTime.local(2022, 8, 28, 21, 0, 0, 0).toUTC().toMillis());

    return (
        <PageContentBox sx={{ paddingLeft: "2vw" }}>
            <h2>Custom hook</h2>
            <p>Last update: {theTimeThatPassed}</p>
            <Button onClick={() => resetTimer()} variant="outlined">Reset last update timer</Button>
            <p>Last update: {theTimeThatPassed2}</p>
            <Button onClick={() => resetTimer2()} variant="outlined">Reset last update timer</Button>
            <p>Last update: {theTimeThatPassed4}</p>
            <Button onClick={() => resetTimer4()} variant="outlined">Reset last update timer</Button>
            <p>Last update: {theTimeThatPassed5}</p>
            <Button onClick={() => resetTimer5()} variant="outlined">Reset last update timer</Button>
        </PageContentBox>
    );
}
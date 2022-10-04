import styles from "./CssPage.module.scss"
import {Slider, SliderProps} from "@mui/material";
import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {cyan} from '@mui/material/colors';
import PageContentBox from "../components/PageContentBox";

interface MaterialEmotionSliderProps extends SliderProps {
    sliderBorderRadius: number
}

const MaterialThemeEmotionSlider = styled(Slider, {shouldForwardProp: (prop) => prop !== "sliderBorderRadius"})
    < MaterialEmotionSliderProps > (({sliderBorderRadius, theme}) =>
        ({
            color: theme.palette.info.main,
            minWidth: "100px",
            width: "10vw",
            "& .MuiSlider-thumb": {
                borderRadius: `${sliderBorderRadius / 10}px`
            }
        }));

const MaterialEmotionSlider = styled(Slider, {shouldForwardProp: (prop) => prop !== "sliderBorderRadius"})
    < MaterialEmotionSliderProps > (({sliderBorderRadius}) => ({
        color: cyan[500],
        minWidth: "100px",
        width: "10vw",
        "& .MuiSlider-thumb": {
            borderRadius: `${sliderBorderRadius / 10}px`
        }
    }));

export default function CssPage() {
    const [sliderValue, setSliderValue] = useState<number>(40);

    return (
        <PageContentBox sx={{ paddingLeft: "2vw" }}>
            <h2>Dealing with CSS in React</h2>
            There four different approaches when dealing with CSS-styling in React using Material-UI.
            <h3>sx-Attribute</h3>
            <Slider value={sliderValue}
                    valueLabelDisplay="auto"
                    onChange={(_event, newValue) => setSliderValue(newValue as number)}
                    sx={{
                        color: "cyan",
                        minWidth: "100px",
                        width: "10vw",
                        "& .MuiSlider-thumb": {
                            borderRadius: `${sliderValue / 10}px`
                        }
                    }}/>
            <h3>SCSS Modules</h3>
            <Slider value={sliderValue}
                    valueLabelDisplay="auto"
                    onChange={(_event, newValue) => setSliderValue(newValue as number)}
                    className={styles.moduleSlider}
                    style={{"--thumbRadius": `${sliderValue}px`} as React.CSSProperties}
            />
            <h3>Material/Emotion Styled using theme</h3>
            <MaterialThemeEmotionSlider value={sliderValue}
                                        valueLabelDisplay="auto"
                                        onChange={(_event, newValue) => setSliderValue(newValue as number)}
                                        sliderBorderRadius={sliderValue}/>
            <h3>Material/Emotion Styled using material colors</h3>
            <MaterialEmotionSlider value={sliderValue}
                                   valueLabelDisplay="auto"
                                   onChange={(_event, newValue) => setSliderValue(newValue as number)}
                                   sliderBorderRadius={sliderValue}/>
        </PageContentBox>
    );
}
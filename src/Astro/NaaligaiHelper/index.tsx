import React from 'react';
import {
    NumericInput,
    RadioGroup,
    Radio
} from '@blueprintjs/core';
import { Select } from "@blueprintjs/select";
import {
    TimePicker,
} from '@blueprintjs/datetime';
import { type } from 'os';
import { off } from 'process';
interface compProps { }
type outputTypes = "நாழிகை" | "சூரிய உதயம்" | "நேரம்";
interface compState {
    output: outputTypes,
    starting: number,
    offset: number
}

class NaligaiHelper extends React.Component<compProps, compState> {
    constructor(props: compProps) {
        super(props);
        let tempDate = new Date();
        tempDate.setHours(6);
        tempDate.setMinutes(0);
        tempDate.setSeconds(0);
        tempDate.setMilliseconds(0);

        this.state = {
            output: "நேரம்",
            starting: tempDate.getTime() / 1000,
            offset: 10800
        };
    }

    outputUpdater = (value: outputTypes) => {
        this.setState({
            output: value
        });
    }

    getNaaligai = (offset: number) => {
        let x = offset;
        x = Math.floor(x / 24);
        x = Math.floor(x / 60);
        return x;
    }
    getVinadi = (offset: number) => {
        let x = offset;
        x = Math.floor(x / 24);
        x = x % 60;
        return x;
    }

    handleTimeChange = (updatedTime: Date) => {
        const {
            state: {
                output,
                starting,
                offset
            } 
        } = this;
        if (output === "சூரிய உதயம்") {
            this.setState({
                starting: Math.floor(updatedTime.getTime()/1000) - offset
            });

        } else if (output === "நாழிகை") {
            let newSeconds = Math.floor(updatedTime.getTime()/1000) - starting;
            this.setState({
                offset: this.correctOffset(newSeconds)
            });
        }
    }

    handleSunChange = (updatedTime: Date) => {
        const {
            state: {
                output,
                starting,
                offset
            } 
        } = this;
        if (output === "நேரம்") {
            this.setState({
                starting: Math.floor(updatedTime.getTime()/1000)
            });

        } else if (output === "நாழிகை") {
            let newSeconds = Math.floor(updatedTime.getTime()/1000) - starting;
            this.setState({
                starting: Math.floor(updatedTime.getTime()/1000),
                offset: this.correctOffset((starting + offset) - Math.floor(updatedTime.getTime()/1000))
            });
        }
    }

    handleNaaligai = (naaligai:number) => {
        const {
            state: {
                output,
                starting,
                offset
            } 
        } = this;

        this.setState({
            offset: this.correctOffset(naaligai * 60 * 24 +  this.getVinadi(offset) * 24)
        });
    };
    handleVinadi = (vinadi:number) => {
        const {
            state: {
                output,
                starting,
                offset
            } 
        } = this;
        this.setState({
            offset: this.correctOffset(this.getNaaligai(offset) * 60 * 24 + vinadi * 24)
        });
    };

    correctOffset= (offset:number) =>  {
        return (offset + (60*60*24))%(60*60*24);
    }

    render(): React.ReactNode {
        const {
            state: {
                output,
                starting,
                offset
            },
            outputUpdater,
            getNaaligai,
            getVinadi,
            handleTimeChange,
            handleSunChange,
            handleNaaligai,
            handleVinadi
        } = this;
        return <div style={{
            height: "100vh",
            width: "100vw",
            padding: "15px"
        }}>
            <h1>{"நாழிகை உதவியாளர்"}</h1>
            <h3>{"Output"}</h3>
            <RadioGroup
                label="Meal Choice"
                onChange={e => {
                    outputUpdater(e.currentTarget.value as outputTypes)
                }}
                selectedValue={output}
            >
                <Radio label="நாழிகை" value="நாழிகை" />
                <Radio label="சூரிய உதயம்" value="சூரிய உதயம்" />
                <Radio label="நேரம்" value="நேரம்" />
            </RadioGroup>
            <h3>{"நாழிகை"}</h3>
            {"நாழிகை"}
            <NumericInput onValueChange={handleNaaligai} value={getNaaligai(offset)} disabled={output === "நாழிகை"} defaultValue={0} max={59} min={0} placeholder="நாழிகை" />
            {"வினாடி"}
            <NumericInput onValueChange={handleVinadi} value={getVinadi(offset)} disabled={output === "நாழிகை"} defaultValue={0} max={59} min={0} placeholder="நாழிகை" />
            <h3>{"சூரிய உதயம்"}</h3>
            <TimePicker onChange={handleSunChange} value={new Date(starting * 1000)} disabled={output === "சூரிய உதயம்"} useAmPm={true} />
            <h3>{"நேரம்"}</h3>
            <TimePicker onChange={handleTimeChange} value={new Date((starting + offset) * 1000)} disabled={output === "நேரம்"} useAmPm={true} />
        </div>;
    }
}

export default NaligaiHelper;


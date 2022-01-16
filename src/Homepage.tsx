import React from "react";
import { Button } from '@blueprintjs/core';


interface HomepageProps { }
interface HomepageState { }
class HomePage extends React.Component<HomepageProps, HomepageState> {
    constructor(props: HomepageProps) {
        super(props);
    }
    render(): React.ReactNode {
        return <div style={{
            height: "100vh",
            width: "100vw",
            padding: "15px"
        }}>
            <h1>{"Hingua.in"}</h1>
            <div>
                <Button intent="primary" onClick={() => window.location.href = "/wa-messenger"}>
                    {"Contactless WhatsApp Messenger"}
                </Button>
            </div>
            <div>
                <br />
                <Button intent="primary" onClick={() => window.location.href = "/astro"}>
                    {"Astrology"}
                </Button>
            </div>
        </div>
    }
}

export default HomePage;
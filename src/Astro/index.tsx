import React from "react";
import { Button } from '@blueprintjs/core';
interface AstroHomepageProps {}
interface AstroHomepageState {}
class AstroHomePage extends React.Component<AstroHomepageProps,AstroHomepageState> {
    constructor(props:AstroHomepageProps) {
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
                <Button intent="primary" onClick={() => window.location.href = "/astro/naaligai-helper"}>
                    {"நாழிகை உதவியாளர்"}
                </Button>
            </div>
        </div>
    }
}

export default AstroHomePage;
import React from "react";
import CountryCodes from './CountryCodes.json';
import { Label, Menu, MenuItem, Button, InputGroup } from '@blueprintjs/core'
import { Select } from "@blueprintjs/select";

const openInNewTab = (href) => {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
    }).click();
}

const countryFilter = (query) => {
    if (!query) {
        return () => true;
    }
    return (item) => {
        if (item.inputDisplay.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            return true;
        }
        return false;
    }
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        let selectedCountry = localStorage.getItem("country_code");
        if (selectedCountry) {
            try {
                selectedCountry = JSON.parse(selectedCountry)
            } catch (e) { }
        }
        selectedCountry = selectedCountry || {
            "inputDisplay": "India",
            "value": "IN_91",
            "flag": "🇮🇳"
        };
        this.state = {
            selectedCountry,
            phoneNumber: ""
        };
    }

    selectCountry = (selectedCountry) => {
        this.setState({ selectedCountry });
    }

    render() {
        const { selectedCountry, phoneNumber } = this.state;
        return (
            <div className="App">
                <h1>
                    WhatsApp Contactless Messenger
                </h1>
                <p>
                    {"This is an app designed for people who want to send WhatsApp messages without adding contact."}
                </p>
                <Label>
                    {"Select Country"}
                    <Select
                        items={CountryCodes}
                        itemRenderer={(item) => {
                            return <MenuItem
                                key={item.value}
                                label={`${item.flag} ${item.inputDisplay} (${item.value.split('_')[0]}) (+${item.value.split('_')[1]})`}
                                intent="primary"
                                onClick={() => {
                                    localStorage.setItem("country_code", JSON.stringify(item));
                                    this.selectCountry(item);
                                }}
                                active={selectedCountry.value === item.value}
                                style={{ alignItems: 'start' }}
                            />
                        }}
                        itemListRenderer={({ items, itemsParentRef, query, renderItem }) => {
                            return (
                                <Menu large={true} ulRef={itemsParentRef}>
                                    <div style={{ overflow: "scroll", maxHeight: "50vh" }}>
                                        {items.filter(countryFilter(query)).map(renderItem)}
                                    </div>
                                </Menu>
                            )
                        }}
                        onItemSelect={() => { }}
                    >
                        <Button fill large>
                            {`${selectedCountry.flag} ${selectedCountry.inputDisplay} (${selectedCountry.value.split('_')[0]}) (+${selectedCountry.value.split('_')[1]})`}
                        </Button>
                    </Select>
                </Label>
                <Label>
                    {"Phone Number :"}
                    <InputGroup
                        fill
                        large
                        value={phoneNumber}
                        onChange={(e) => {
                            this.setState({ phoneNumber: e.target.value })
                        }}
                        placeholder="Enter phone number."
                    />
                </Label>
                <Button
                    large
                    intent="primary"
                    text="Send Message"
                    onClick={() => {
                        if (phoneNumber) {
                            const URL = `https://api.whatsapp.com/send?phone=${selectedCountry.value.split('_')[1]}${phoneNumber}`;
                            openInNewTab(URL);
                        } else {
                            alert("Please enter a phone number.");
                        }
                    }}
                />
            </div>
        );
    }
}

export default Application;
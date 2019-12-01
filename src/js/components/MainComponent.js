import React from "react";
import "../../style/sass/MainComponent.sass";
import InputComponent from "./InputComponent";

export default class MainComponent extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    handle_start(in_selected_method, in_current_matrix)
    {
        this.setState({
            method: in_selected_method,
            input_matrix: in_current_matrix
        });
    }

    render()
    {
        return (
            <div className={"MainContainer"}>
                <InputComponent
                    handle_start = {(in_selected_method, in_current_matrix) => this.handle_start(in_selected_method, in_current_matrix)}
                />
            </div>
        );
    }
}

import React from "react";
import "../../style/sass/MainComponent.sass";
import InputComponent from "./InputComponent";
import ComputingComponent from "./ComputingComponent";
import StepGenerator from "../StepGenerator";

export default class MainComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        /*
        this.state = {
            current_page: "start_page",
        };
         */
        this.state = {
            current_page: "computing_page",
            method: "depth",
            input_matrix: [
                [8,5,4],
                [7,0,3],
                [1,6,2]
            ]
        };
    }

    handle_start(in_selected_method, in_current_matrix)
    {
        this.setState({
            current_page: "computing_page",
            method: in_selected_method,
            input_matrix: in_current_matrix
        });
    }

    render()
    {
        return (
            <div className={"MainContainer"}>
                {this.state.current_page === "start_page" &&
                    <InputComponent
                        handle_start={(in_selected_method, in_current_matrix) => this.handle_start(in_selected_method, in_current_matrix)}
                    />
                }
                {this.state.current_page === "computing_page" &&
                    <div>
                        <ComputingComponent
                            method = {this.state.method}
                            input_matrix = {this.state.input_matrix}
                        />
                    </div>
                }
            </div>
        );
    }
}

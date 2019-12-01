import React from "react";
import "../../style/sass/MainComponent.sass";
import InputComponent from "./InputComponent";

export default class MainComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            current_page: "start_page",
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
                        ВЫЧИСЛЕНИЯЯЯЯЯЯЯ!
                    </div>
                }
            </div>
        );
    }
}

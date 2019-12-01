import React from "react";
import "../../style/sass/MainComponent.sass";
import InputComponent from "./InputComponent";
import ComputingComponent from "./ComputingComponent";
import FinishComponent from "./FinishComponent";

export default class MainComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            current_page: "start_page",
        };

        // this.state = {
        //     current_page: "computing_page",
        //     method: "depth",
        //     input_matrix: [
        //         [1,4,2],
        //         [3,0,5],
        //         [6,7,8]
        //     ]
        // };
    }

    handle_start(in_selected_method, in_current_matrix)
    {
        this.setState({
            current_page: "computing_page",
            method: in_selected_method,
            input_matrix: in_current_matrix
        });
    }

    handle_finish(in_steps, in_result_tree)
    {
        this.setState({
            current_page: "finish_page",
            computing_steps: in_steps,
            computing_tree: in_result_tree
        });
        //console.log(in_steps, in_result_tree);
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
                        <ComputingComponent
                            method = {this.state.method}
                            input_matrix = {this.state.input_matrix}
                            handle_finish = {(in_steps, in_result_tree) => {this.handle_finish(in_steps, in_result_tree)}}
                        />
                }
                {this.state.current_page === "finish_page" &&
                    <FinishComponent
                        method = {this.state.method}
                        computing_steps = {this.state.computing_steps}
                        computing_tree = {this.state.computing_tree}
                    />
                }
            </div>
        );
    }
}

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
    }

    handle_continue(in_selected_method, current_max_nodes_for_analyse, in_current_matrix)
    {
        this.setState({
            current_page: "selected_result_page",
            current_max_nodes_for_analyse: current_max_nodes_for_analyse,
            method: in_selected_method,
            input_matrix: in_current_matrix,
        });
    }

    handle_set_find_result(in_current_matrix)
    {
        this.setState({
            current_page: "computing_page",
            expected_result: in_current_matrix
        });
    }

    handle_go_to_main()
    {
        this.setState({
            current_page: "start_page",
            current_max_nodes_for_analyse: null,
            method: null,
            input_matrix: null,
            expected_result: null
        });
    }

    handle_finish(in_steps, in_result_tree, in_depth)
    {
        this.setState({
            current_page: "finish_page",
            computing_steps: in_steps,
            computing_depth: in_depth,
            computing_tree: in_result_tree
        });
    }

    render()
    {
        return (
            <div className={"MainContainer"}>
                {this.state.current_page === "start_page" &&
                    <InputComponent
                        page = {this.state.current_page}
                        handle_start={(in_selected_method, current_max_nodes_for_analyse, in_current_matrix) => this.handle_continue(in_selected_method, current_max_nodes_for_analyse, in_current_matrix)}
                    />
                }
                {this.state.current_page === "selected_result_page" &&
                    <InputComponent
                        page = {this.state.current_page}
                        handle_start = {(in_current_matrix) => this.handle_set_find_result(in_current_matrix)}
                        size_matrix = {this.state.input_matrix.length}
                    />
                }
                {this.state.current_page === "computing_page" &&
                    <ComputingComponent
                        method = {this.state.method}
                        current_max_nodes_for_analyse = {this.state.current_max_nodes_for_analyse}
                        input_matrix = {this.state.input_matrix}
                        expected_result = {this.state.expected_result}
                        handle_finish = {(in_steps, in_result_tree, in_depth) => {this.handle_finish(in_steps, in_result_tree, in_depth)}}
                    />
                }
                {this.state.current_page === "finish_page" &&
                    <FinishComponent
                        method = {this.state.method}
                        computing_steps = {this.state.computing_steps}
                        computing_tree = {this.state.computing_tree}
                        computing_depth = {this.state.computing_depth}
                        go_back_to_main = {() => {this.handle_go_to_main()}}
                    />
                }
            </div>
        );
    }
}

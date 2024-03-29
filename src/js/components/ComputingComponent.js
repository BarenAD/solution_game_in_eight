import React from "react";
import StructureForDepth from "../StructureForDepth";
import StructureForWidth from "../StructureForWidth";
import "../../style/sass/ComputingComponent.sass";

export default class ComputingComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            analyzed_step: 0
        }
    }

    componentDidMount()
    {
        if (this.props.method === "depth"){
            this.ComputingForDepth = new StructureForDepth(
                this.props.input_matrix,
                this.props.expected_result,
                this.props.current_max_nodes_for_analyse,
                (in_new_step) => {this.update_step(in_new_step)},
                (in_steps, in_result_tree, in_depth) => {this.props.handle_finish(in_steps, in_result_tree, in_depth)},
            );
            setTimeout(() => {this.ComputingForDepth.find_solution()}, 2000,);
        } else if (this.props.method === "width") {
            this.ComputingForDepth = new StructureForWidth(
                this.props.input_matrix,
                this.props.expected_result,
                this.props.current_max_nodes_for_analyse,
                (in_new_step) => {this.update_step(in_new_step)},
                (in_steps, in_result_tree, in_depth) => {this.props.handle_finish(in_steps, in_result_tree, in_depth)},
            );
            setTimeout(() => {this.ComputingForDepth.find_solution()}, 2000,);
        }
    }

    update_step(in_new_step)
    {
        this.setState({analyzed_step: in_new_step});
    }

    return_gif()
    {
        let src_gif = "src/GIF/";
        if (this.props.method === "depth") {
            src_gif += "depth_search.gif";
        } else if (this.props.method === "width"){
            src_gif += "width_search.gif";
        } else {
            return (<div />);
        }
        return (
            <img
                src={src_gif}
                className={"ComputingGIF"}
                alt={"GIF"}
            />
        );
    }

    render()
    {
        return (
            <div className={"MainContainerComputing"}>
                <div className={"HMaintitleComputing"}>Проанализированно узлов: <div className={"CountAnalyzedNodes"}>{this.state.analyzed_step}</div></div>
                <div className={"ContainerComputingGIF"}>
                    {this.return_gif()}
                </div>
            </div>
        );
    }
}

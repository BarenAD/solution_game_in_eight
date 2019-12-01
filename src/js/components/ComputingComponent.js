import React from "react";
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
                <h1>Проанализированно узлов: <div className={"CountAnalyzedNodes"}>{this.state.analyzed_step}</div></h1>
                <div className={"ContainerComputingGIF"}>
                    {this.return_gif()}
                </div>
            </div>
        );
    }
}

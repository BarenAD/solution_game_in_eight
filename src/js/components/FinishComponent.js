import React from "react";
import "../../style/sass/FinishComponent.sass";

export default class FinishComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Метод:   {this.props.method}</div>
                <div>Шагов:   {this.props.computing_steps}</div>
            </div>
        )
    }
}

import React from "react";
import "../../style/sass/FinishComponent.sass";

export default class FinishComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    create_result()
    {
        let CurrentNode = this.props.computing_tree;
        let ArrayStates = [];
        while (CurrentNode !== null) {
            ArrayStates.unshift(CurrentNode.get_state());
            CurrentNode = CurrentNode.get_parent();
        }
        return ArrayStates;
    }

    render() {
        return (
            <div className={"FinishMainContainer"}>
                <h3>Метод:   {this.props.method}</h3>
                <h3>Шагов:   {this.props.computing_steps}</h3>
                <div className={"RowStatesResults"}>
                    {this.create_result().map(state => (
                        <div className={"StateResultBoard"}>
                            {state.map(row => (
                                <div className={"StateResultOneRow"}>
                                    {row.map(value => {
                                        let PrintValue = value;
                                        if (PrintValue === 0){
                                            PrintValue = "";
                                        }
                                        return (
                                            <div className={"StateResultOneBlock"}>
                                                {PrintValue}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

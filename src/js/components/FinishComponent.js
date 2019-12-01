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
        while (CurrentNode !== null && CurrentNode !== "step_restriction") {
            ArrayStates.unshift(CurrentNode.get_state());
            CurrentNode = CurrentNode.get_parent();
        }
        return ArrayStates;
    }

    render() {
        let IDForBoardKey = 0;
        let IDForRowKey = 0;
        let IDForValueKey = 0;
        let ArrayResultStates = this.create_result();
        return (
            <div className={"FinishMainContainer"}>
                {this.props.computing_tree === "step_restriction" &&
                    <h3 style={{color: "red"}}>Решение не найдено за отведённое количество узлов!</h3>
                }
                <h3>Метод:   {this.props.method}</h3>
                <h3>Узлов создано при анализе:   {this.props.computing_steps}</h3>
                <h3>Число шагов до искомой комбинации:   {ArrayResultStates.length-1}</h3>
                {this.props.method === "width" &&
                    <h3>Глубина: {this.props.computing_depth}</h3>
                }
                <div className={"RowStatesResults"}>
                    {ArrayResultStates.map(state => {
                        IDForBoardKey++;
                        return (
                            <div
                                key={"BoardFinishStateID::" + IDForBoardKey}
                                className={"StateResultBoard"}
                            >
                                {state.map(row => {
                                    IDForRowKey++;
                                    return (
                                        <div
                                            key={"RowFinishStateID::" + IDForRowKey}
                                            className={"StateResultOneRow"}
                                        >
                                            {row.map(value => {
                                                IDForValueKey++;
                                                let PrintValue = value;
                                                if (PrintValue === 0) {
                                                    PrintValue = "";
                                                }
                                                return (
                                                    <div
                                                        key={"ValueFinishStateID::" + IDForValueKey}
                                                        className={"StateResultOneBlock"}
                                                    >
                                                        {PrintValue}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

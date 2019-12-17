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
        let SizeMatrix = 0;
        if (ArrayResultStates.length > 0){
            SizeMatrix = ArrayResultStates[0].length;
        }
        return (
            <div className={"FinishMainContainer"}>
                <button
                    className={"ButtonBackToMain"}
                    onClick={() => {this.props.go_back_to_main()}}
                >
                    вернуться на главную
                </button>
                {this.props.computing_tree === "step_restriction" &&
                    <h3 style={{color: "red"}}>Решение не найдено за отведённое количество узлов!</h3>
                }
                <h3>Метод:   <p>{this.props.method}</p></h3>
                <h3>Узлов создано при анализе:   <p>{this.props.computing_steps}</p></h3>
                <h3>Число шагов до искомой комбинации:   <p>{ArrayResultStates.length-1}</p></h3>
                {this.props.method === "width" &&
                    <h3>Глубина: {this.props.computing_depth}</h3>
                }
                <div className={"RowStatesResults"}>
                    {ArrayResultStates.map(state => {
                        IDForBoardKey++;
                        return (
                            <div
                                key={"BoardFinishStateID::" + IDForBoardKey}
                                className={"StateResultBoardContainer"}
                            >
                                <div
                                    className={"StateResultBoard"}
                                >
                                    {state.map(row => {
                                        IDForRowKey++;
                                        return (
                                            <div
                                                key={"RowFinishStateID::" + IDForRowKey}
                                                className={"StateResultOneRow"}
                                                style={{height: (100/SizeMatrix) + "%"}}
                                            >
                                                {row.map(value => {
                                                    IDForValueKey++;
                                                    let PrintValue = value;
                                                    let AddClassName = "";
                                                    if (PrintValue === 0) {
                                                        PrintValue = "";
                                                        AddClassName = " StateResultOneBlock-null";
                                                    }
                                                    return (
                                                        <div
                                                            key={"ValueFinishStateID::" + IDForValueKey}
                                                            className={"StateResultOneBlock" + AddClassName}
                                                            style={{
                                                                width: (90/SizeMatrix) + "%",
                                                                height: "90%"
                                                            }}
                                                        >
                                                            {PrintValue}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

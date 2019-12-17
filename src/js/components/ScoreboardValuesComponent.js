import React from "react";
import "../../style/sass/ScoreboardValuesComponent.sass";

export default class ScoreboardValuesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rows = 0;
        let SizeMatrix = this.props.available_values.length;
        return (
            <div className={"scoreboard_values"}>
                {this.props.available_values.map(row => {
                    rows++;
                    return (
                        <div
                            key={"KeyID_rows_in_scoreboard_values::" + rows}
                            className={"one_row"}
                            style={{height: (35/SizeMatrix) + "vmin"}}
                        >
                            {row.map(value => {
                                let DisactiveButton = false;
                                let ClassListButton = "one_block";
                                let PrintValue = value;
                                if (this.props.current_temp_input_matrix.find(find_value => find_value === value) !== undefined) {
                                    DisactiveButton = true;
                                    ClassListButton += " one_block_disabled";
                                }
                                if (PrintValue === 0) {
                                    PrintValue = "";
                                }
                                return (
                                    <button
                                        key={"KeyID_button_in_scoreboard_values::" + value}
                                        className={ClassListButton}
                                        disabled={DisactiveButton}
                                        style={{
                                            width: (30/SizeMatrix) + "vmin",
                                            height: (30/SizeMatrix) + "vmin"
                                        }}
                                        onClick={() => {
                                            this.props.handle_add_value_in_matrix(value)
                                        }}
                                    >
                                        {PrintValue}
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

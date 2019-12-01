import React from "react";
import "../../style/sass/ScoreboardValuesComponent.sass";

export default class ScoreboardValuesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rows = 0;
        return (
            <div className={"scoreboard_values"}>
                {this.props.available_values.map(row => {
                    rows++;
                    return (
                        <div
                            key={"KeyID_rows_in_scoreboard_values::" + rows}
                            className={"one_row"}
                        >
                            {row.map(value => {
                                let DisactiveButton = false;
                                let ClassListButton = "one_block";
                                if (this.props.current_temp_input_matrix.find(find_value => find_value === value) !== undefined) {
                                    DisactiveButton = true;
                                    ClassListButton += " one_block_disabled";
                                }
                                return (
                                    <button
                                        key={"KeyID_button_in_scoreboard_values::" + value}
                                        className={ClassListButton}
                                        disabled={DisactiveButton}
                                        onClick={() => {
                                            this.props.handle_add_value_in_matrix(value)
                                        }}
                                    >
                                        {value}
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

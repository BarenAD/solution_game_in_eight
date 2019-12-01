import React from "react";
import "../../style/sass/PaintCurrentTempInputMatrix.sass";

export default class PaintCurrentTempInputMatrix extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let rows = 0;
        let IndexMatrix = -1;
        return (
            <div className={"current_temp_input_matrix_board"}>
                {this.props.available_values.map(row => {
                    rows++;
                    return (
                        <div
                            key={"KeyID_rows_in_current_temp_input_matrix_board_values::" + rows}
                            className={"one_row"}
                        >
                            {row.map(value => {
                                IndexMatrix++;
                                let DisactiveButton = false;
                                let ClassListButton = "one_block";
                                let ValueMatrix = "";
                                if (this.props.current_temp_input_matrix[IndexMatrix] === undefined || this.props.current_temp_input_matrix[IndexMatrix] === null) {
                                    DisactiveButton = true;
                                    ClassListButton += " one_block_empty";
                                } else {
                                    ValueMatrix = this.props.current_temp_input_matrix[IndexMatrix];
                                }
                                return (
                                    <button
                                        key={"KeyID_button_in_current_temp_input_matrix_board_values::" + value}
                                        className={ClassListButton}
                                        disabled={DisactiveButton}
                                        onClick={() => {this.props.handle_delete_value_in_matrix(ValueMatrix)}}
                                    >
                                        {ValueMatrix}
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

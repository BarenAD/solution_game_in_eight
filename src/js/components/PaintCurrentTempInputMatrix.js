import React from "react";
import "../../style/sass/PaintCurrentTempInputMatrix.sass";

export default class PaintCurrentTempInputMatrix extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let rows = 0;
        let IndexMatrix = -1;
        let SizeMatrix = this.props.available_values.length;
        return (
            <div className={"current_temp_input_matrix_board"}>
                {this.props.available_values.map(row => {
                    rows++;
                    return (
                        <div
                            key={"KeyID_rows_in_current_temp_input_matrix_board_values::" + rows}
                            className={"one_row"}
                            style={{
                                height: (82/SizeMatrix) + "vmin",
                                maxHeight: (38/SizeMatrix) + "vw"
                            }}
                        >
                            {row.map(value => {
                                IndexMatrix++;
                                let DisactiveButton = false;
                                let ClassListButton = "one_block";
                                let ValueMatrix = "";
                                let PrintValueMatrix = "";
                                if (this.props.current_temp_input_matrix[IndexMatrix] === undefined || this.props.current_temp_input_matrix[IndexMatrix] === null) {
                                    DisactiveButton = true;
                                    ClassListButton += " one_block_empty";
                                } else {
                                    ValueMatrix = this.props.current_temp_input_matrix[IndexMatrix];
                                    PrintValueMatrix = ValueMatrix;
                                    if (PrintValueMatrix === 0) {
                                        PrintValueMatrix = "";
                                    }
                                }
                                return (
                                    <button
                                        key={"KeyID_button_in_current_temp_input_matrix_board_values::" + value}
                                        className={ClassListButton}
                                        disabled={DisactiveButton}
                                        style={{
                                            width: (77/SizeMatrix) + "vmin",
                                            maxWidth: (36/SizeMatrix) + "vw",
                                            height: (77/SizeMatrix) + "vmin",
                                            maxHeight: (36/SizeMatrix) + "vw"
                                        }}
                                        onClick={() => {this.props.handle_delete_value_in_matrix(ValueMatrix)}}
                                    >
                                        {PrintValueMatrix}
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

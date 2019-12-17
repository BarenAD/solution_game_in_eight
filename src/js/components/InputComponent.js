import React from "react";
import "../../style/sass/InputComponent.sass";
import ScoreboardValuesComponent from "./ScoreboardValuesComponent";
import PaintCurrentTempInputMatrix from "./PaintCurrentTempInputMatrix";

export default class InputComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        if (this.props.page === "start_page") {
            this.state = {
                current_selected_Method: "depth",
                size_matrix: 4,
                current_temp_input_matrix: [],
                current_max_nodes_for_analyse: 100000,
                available_values: []
            }
        } else if (this.props.page === "selected_result_page") {
            this.state = {
                size_matrix: this.props.size_matrix,
                current_temp_input_matrix: [],
                available_values: []
            };
            for (let i = 0; i < (this.state.size_matrix*this.state.size_matrix); i++) {
                this.state.current_temp_input_matrix.push(i);
            }
        }
    }

    componentDidMount() {
        this.generated_available_values(this.state.size_matrix);
    }

    generated_available_values(size_matrix)
    {
        let Count = 0;
        let ResultMatrix = [];
        for (let i = 0; i < size_matrix; i++) {
            let temp_array = [];
            for (let j = 0; j < size_matrix; j++) {
                temp_array.push(Count);
                Count++;
            }
            ResultMatrix.push(temp_array);
        }
        this.setState({
            available_values: ResultMatrix
        });
    }

    handle_change_size_matrix(string_new_size_matrix)
    {
        if (this.ChangeSizeTimer !== null && this.ChangeSizeTimer !== undefined) {
            clearTimeout(this.ChangeSizeTimer);
        }
        this.ChangeSizeTimer = setTimeout(() => {
            if (parseInt(string_new_size_matrix) > 1) {
                this.handle_apply_size_matrix(parseInt(string_new_size_matrix));
            }
        }, 1000);
    }

    handle_apply_size_matrix(new_size_matrix)
    {
        delete this.ChangeSizeTimer;
        this.setState({
            size_matrix: new_size_matrix,
            current_temp_input_matrix: []
        });
        this.generated_available_values(new_size_matrix);
    }

    handle_delete_value_in_current_temp_input_matrix(value)
    {
        let NewMatrix = [];
        for (let i = 0; i < this.state.current_temp_input_matrix.length; i++)
        {
            if (this.state.current_temp_input_matrix[i] !== value){
                NewMatrix.push(this.state.current_temp_input_matrix[i]);
            }
        }
        this.setState({current_temp_input_matrix: NewMatrix});
    }

    handle_add_value_in_current_temp_input_matrix(value)
    {
        this.state.current_temp_input_matrix.push(value);
        this.setState({current_temp_input_matrix: this.state.current_temp_input_matrix});
    }

    handle_change_metod(in_Method)
    {
        this.setState({current_selected_Method: in_Method});
    }

    handle_change_current_max_nodes_for_analyse(new_value)
    {
        this.setState({current_max_nodes_for_analyse: new_value});
    }

    return_metods()
    {
        let ClassName1 = "Method";
        let ClassName2 = "Method";
        if (this.state.current_selected_Method === "depth") {
            ClassName1 += " Method-active";
        } else if (this.state.current_selected_Method === "width") {
            ClassName2 += " Method-active";
        }
        return (
            <div className={"SwitchMethod"}>
                <button
                    className={ClassName1}
                    style={{borderRight: "1px solid black"}}
                    onClick={() => {this.handle_change_metod("depth")}}
                >
                    В глубину
                </button>
                <button
                    className={ClassName2}
                    style={{borderLeft: "1px solid black"}}
                    onClick={() => {this.handle_change_metod("width")}}
                >
                    В ширину
                </button>
            </div>
        )
    }

    handle_start()
    {
        if (this.state.current_temp_input_matrix.length < (this.state.size_matrix*this.state.size_matrix)) {
            alert("Задана не вся матрица!");
        } else {
            let ValidateMatrix = this.validate_matrix(this.state.current_temp_input_matrix);
            if (this.props.page === "start_page") {
                this.props.handle_start(this.state.current_selected_Method, parseInt(this.state.current_max_nodes_for_analyse), ValidateMatrix);
            } else if (this.props.page === "selected_result_page") {
                this.props.handle_start(ValidateMatrix);
            }
        }
    }

    validate_matrix(input_array)
    {
        let ResultArray = [];
        let Count = 0;
        for (let i = 0; i < this.state.size_matrix; i++)
        {
            let TempArray = [];
            for (let j = 0; j < this.state.size_matrix; j++) {
                TempArray.push(input_array[Count]);
                Count++;
            }
            ResultArray.push(TempArray);
        }
        return ResultArray;
    }

    render()
    {
        return (
            <div className={"InputMainContainer"}>
                {this.props.page === "start_page" &&
                    <div className={"HMaintitle"}>Добро пожаловать в решатор игры "пятнашки!"</div>
                }
                <div className={"InsideMainContainer"}>
                    <div className={"InsideSecondaryContainer Matrixs"}>
                        <div className={"Htitle"}>задайте матрицу</div>
                        <ScoreboardValuesComponent
                            available_values = {this.state.available_values}
                            current_temp_input_matrix = {this.state.current_temp_input_matrix}
                            handle_add_value_in_matrix = {(value) => {this.handle_add_value_in_current_temp_input_matrix(value)}}
                        />
                    </div>
                    {this.props.page === "start_page" &&
                        <div className={"InsideSecondaryContainer SelectedAttributes"}>
                            <div className={"Htitle title-selected-attr"}>Выберите метод поиска!</div>
                            {this.return_metods()}
                            <div className={"InputSizeMatrixContainer"}>
                                <input
                                    className={"InputSizeMatrix"}
                                    type={"text"}
                                    placeholder={"размер матрицы"}
                                    title={"размер матрицы"}
                                    defaultValue={this.state.size_matrix}
                                    onChange={(event) => {this.handle_change_size_matrix(event.target.value)}}
                                />
                                x {this.state.size_matrix}
                            </div>
                            <input
                                className={"InputMaxNodesForAnalyse"}
                                type={"text"}
                                placeholder={"максимальное число узлов для анализа"}
                                title={"максимальное число узлов для анализа"}
                                defaultValue={100000}
                                onChange={(event) => {this.handle_change_current_max_nodes_for_analyse(event.target.value)}}
                            />
                            <button
                                className={"StartButton"}
                                onClick={() => {
                                    this.handle_start()
                                }}
                            >
                                ДАЛЕЕ
                            </button>
                        </div>
                    }
                    {this.props.page === "selected_result_page" &&
                        <div className={"InsideSecondaryContainer SelectedAttributes"}>
                            <div className={"Htitle title-selected-attr"}>Задайте искомую комбинацию!</div>
                            <button
                                className={"StartButton"}
                                onClick={() => {
                                    this.handle_start()
                                }}
                            >
                                СТАРТ
                            </button>
                        </div>
                    }
                    <div className={"InsideSecondaryContainer Matrixs"}>
                        <div className={"Htitle"}>всё верно?</div>
                        <PaintCurrentTempInputMatrix
                            available_values = {this.state.available_values}
                            current_temp_input_matrix = {this.state.current_temp_input_matrix}
                            handle_delete_value_in_matrix = {(value) => {this.handle_delete_value_in_current_temp_input_matrix(value)}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

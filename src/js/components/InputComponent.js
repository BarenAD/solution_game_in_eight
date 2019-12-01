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
                current_temp_input_matrix: [],
                current_max_nodes_for_analyse: 10000,
                available_values: [
                    [1, 2, 3],
                    [4, 0, 5],
                    [6, 7, 8]
                ]
            }
        } else if (this.props.page === "selected_result_page") {
            this.state = {
                current_temp_input_matrix: [0,1,2,3,4,5,6,7,8],
                available_values: [
                    [1, 2, 3],
                    [4, 0, 5],
                    [6, 7, 8]
                ]
            }
        }
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
        if (this.state.current_temp_input_matrix.length < 9) {
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
        let NewArray = [[],[],[]];
        let y = 0;
        for (let i = 0; i < 9; i++)
        {
            NewArray[y].push(input_array[i]);
            if ((i+1)%3 === 0) {
                y++;
            }
        }
        return NewArray;
    }

    render()
    {
        return (
            <div className={"InputMainContainer"}>
                {this.props.page === "start_page" &&
                    <h1>Добро пожаловать в решатор игры в 8!</h1>
                }
                <div className={"InsideMainContainer"}>
                    <div className={"InsideSecondaryContainer"}>
                        <h2>Задайте матрицу!</h2>
                        <ScoreboardValuesComponent
                            available_values = {this.state.available_values}
                            current_temp_input_matrix = {this.state.current_temp_input_matrix}
                            handle_add_value_in_matrix = {(value) => {this.handle_add_value_in_current_temp_input_matrix(value)}}
                        />
                    </div>
                    {this.props.page === "start_page" &&
                        <div className={"InsideSecondaryContainer"}>
                            <h2>Выберите метод поиска!</h2>
                            {this.return_metods()}
                            <input
                                className={"InputMaxNodesForAnalyse"}
                                type={"text"}
                                placeholder={"максимальное число узлов для анализа"}
                                title={"максимальное число узлов для анализа"}
                                defaultValue={1000000}
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
                        <div className={"InsideSecondaryContainer"}>
                            <h2>Задайте искомую комбинацию!</h2>
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
                    <div className={"InsideSecondaryContainer"}>
                        <h2>Всё верно?</h2>
                        <PaintCurrentTempInputMatrix
                            available_values = {this.state.available_values}
                            current_temp_input_matrix = {this.state.current_temp_input_matrix}
                            handle_delete_value_in_matrix = {(value) => {this.handle_delete_value_in_current_temp_input_matrix(value)}}
                        />
                    </div>
                </div>
                <h2 className={"performed"}>
                    Выполнили студенты, группы
                    <div className={"group_title"}>М-165</div>:
                    <div>
                        <a href={"https://vk.com/barenad"}>Малашин Павел Сергеевич</a>
                        <a href={"https://vk.com/sciencewolf"}>Новиков Дмитрий Юрьевич</a>
                    </div>
                </h2>
            </div>
        );
    }
}

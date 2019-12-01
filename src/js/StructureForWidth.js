import Node from "./Node";
import StepGenerator from "./StepGenerator";

export default class StructureForWidth
{
    constructor(in_start_state, in_expected_result, function_update_steps, function_finish) {
        this.function_update_steps = function_update_steps;
        this.function_finish = function_finish;
        this.expected_result = in_expected_result;
        let ItIsOk = true;
        let HeightMatrix = in_start_state.length;
        for (let i = 0; i < HeightMatrix; i++) {
            if (in_start_state[i].length !== HeightMatrix) {
                alert("Входные данные не корректны! Размер матрицы должен быть квадратным!");
                ItIsOk = false;
            }
        }
        if (ItIsOk) {
            this.ROOT = new Node(null, in_start_state);
            this.steps = 0;
            this.current = this.ROOT;
            let ChildrensStates = StepGenerator(in_start_state);
            for (let i = 0; i < ChildrensStates.length; i++) {
                this.ROOT.add_children(new Node(this.current, ChildrensStates[i]));
            }
        }
    }

    __check_congratulations(in_state)
    {
        let HeightMatrix = in_state.length;
        for (let i = 0; i < HeightMatrix; i++){
            for(let j = 0; j < HeightMatrix; j++) {
                if (in_state[i][j] !== this.expected_result[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    find_solution()
    {

    }
}

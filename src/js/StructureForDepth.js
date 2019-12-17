import Node from "./Node";
import StepGenerator from "./StepGenerator";
import check_on_repeat_to_up_branch from "./CheckOnRepeatToUpBranch";

export default class StructureForDepth
{
    constructor(in_start_state, in_expected_result, current_max_nodes_for_analyse, function_update_steps, function_finish)
    {
        this.function_update_steps = function_update_steps;
        this.function_finish = function_finish;
        this.expected_result = in_expected_result;
        this.current_max_nodes_for_analyse = current_max_nodes_for_analyse;
        let ItIsOk = true;
        let HeightMatrix = in_start_state.length;
        for(let i = 0; i < HeightMatrix; i++) {
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
            this.steps = ChildrensStates.length;
            for(let i = 0; i < ChildrensStates.length; i++) {
                this.ROOT.add_children(new Node(this.current, ChildrensStates[i]));
            }
            this.STOP_MACHINE = false;
            this.EMERGENCY_EXIT = false;
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
        let amount_ways = this.current.get_amount_childrens();
        if (amount_ways < 1){
            let NewChildrensStates = StepGenerator(this.current.get_state());
            this.steps += NewChildrensStates.length;
            NewChildrensStates = check_on_repeat_to_up_branch(this.current, NewChildrensStates);
            for(let i = 0; i < NewChildrensStates.length; i++) {
                this.current.add_children(new Node(this.current, NewChildrensStates[i]));
            }
        }
        let next_way = this.current.get_first_children();
        if (next_way === null) {
            if (this.current.get_parent() !== null) {
                this.current = this.current.get_parent();
            } else {
                this.STOP_MACHINE = true;
                this.EMERGENCY_EXIT = true;
            }
        } else {
            this.current = next_way;
            if (this.__check_congratulations(this.current.get_state())) {
                this.STOP_MACHINE = true;
            }
        }
        this.function_update_steps(this.steps);
        if (this.STOP_MACHINE || (this.steps >= this.current_max_nodes_for_analyse) || this.__check_congratulations(this.current.get_state())){
            if(this.steps >= this.current_max_nodes_for_analyse) {
                this.function_finish(this.steps, "step_restriction", null);
            } else if (this.EMERGENCY_EXIT) {
                this.function_finish(this.steps, null, null);
            } else {
                this.function_finish(this.steps, this.current, null);
            }
        } else {
            setTimeout(() => {this.find_solution()}, 0);
        }
    }
}

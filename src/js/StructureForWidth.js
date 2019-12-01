import StepGenerator from "./StepGenerator";
import Node from "./Node";
import check_on_repeat_to_up_branch from "./CheckOnRepeatToUpBranch";
import check_states_on_identity from "./CheckStatesOnIdentity";

export default class StructureForWidth
{
    constructor(in_start_state, in_expected_result, current_max_nodes_for_analyse, function_update_steps, function_finish) {
        this.function_update_steps = function_update_steps;
        this.function_finish = function_finish;
        this.expected_result = in_expected_result;
        this.current_max_nodes_for_analyse = current_max_nodes_for_analyse;
        let ItIsOk = true;
        let HeightMatrix = in_start_state.length;
        for (let i = 0; i < HeightMatrix; i++) {
            if (in_start_state[i].length !== HeightMatrix) {
                alert("Входные данные не корректны! Размер матрицы должен быть квадратным!");
                ItIsOk = false;
            }
        }
        if (ItIsOk) {
            this.STOP_MACHINE = false;
            this.EMERGENCY_EXIT = false;
            this.ROOT = new Node(null, in_start_state);
            this.steps = 0;
            this.depth = 1;
            // this.current = this.ROOT;
            this.current_array_nodes = [this.ROOT];
            let ChildrensStates = StepGenerator(in_start_state);
            for(let i = 0; i < ChildrensStates.length; i++) {
                this.ROOT.add_children(new Node(this.ROOT, ChildrensStates[i]));
                this.steps++;
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
        let NewCurrentArrayNodes = [];
        for(let i = 0; i < this.current_array_nodes.length; i++) {
            let Childrens = this.current_array_nodes[i].get_all_childrens();
            for(let j = 0; j < Childrens.length; j++) {
                if(this.__check_congratulations(Childrens[j].get_state())){
                    this.STOP_MACHINE = true;
                    this.function_finish(this.steps, Childrens[j], this.depth);
                }
                NewCurrentArrayNodes.push(Childrens[j]);
            }
        }
        if (!this.STOP_MACHINE && !this.EMERGENCY_EXIT && this.steps < this.current_max_nodes_for_analyse) {
            this.depth++;
            let NewCurrentArrayNodesChildrens = [];
            for (let i = 0; i < NewCurrentArrayNodes.length; i++) {
                let NewChildrensStates = StepGenerator(NewCurrentArrayNodes[i].get_state());
                this.steps += NewChildrensStates.length;
                NewChildrensStates = check_on_repeat_to_up_branch(NewCurrentArrayNodes[i], NewChildrensStates);
                NewCurrentArrayNodesChildrens.push(NewChildrensStates);
            }
            NewCurrentArrayNodesChildrens = check_on_repeat_to_width_childrens(NewCurrentArrayNodesChildrens);
            if (NewCurrentArrayNodesChildrens.length !== NewCurrentArrayNodes.length) {
                alert("VSE V GOVNEEEEE!!!!!!");
            } else {
                for (let i = 0; i < NewCurrentArrayNodes.length; i++) {
                    for (let j = 0; j < NewCurrentArrayNodesChildrens[i].length; j++) {
                        NewCurrentArrayNodes[i].add_children(new Node(NewCurrentArrayNodes[i], NewCurrentArrayNodesChildrens[i][j]));
                    }
                }
            }
            this.current_array_nodes = NewCurrentArrayNodes;
            this.function_update_steps(this.steps);
            setTimeout(() => {this.find_solution()}, 100,);
        }
        if(this.steps > this.current_max_nodes_for_analyse){
            this.function_finish(this.steps, "step_restriction", this.depth);
        }
    }
}

function check_on_repeat_to_width_childrens(array_nodes_childrens) {
    let LocalArrayNodesChildrens = array_nodes_childrens;
    let NewArrayNodesChildrens = [];
    for(let i = 0; i < LocalArrayNodesChildrens.length; i++){
        let NewArrayNodeChildrens = [];
        for(let j = 0; j < LocalArrayNodesChildrens[i].length; j++){
            if(NewArrayNodesChildrens.length > 0){
                let Unique = true;
                for(let g = 0; g < NewArrayNodesChildrens.length; g++){
                    for(let h = 0; h < NewArrayNodesChildrens[g].length; h++){
                        if (check_states_on_identity(LocalArrayNodesChildrens[i][j], NewArrayNodesChildrens[g][h])){
                            Unique = false;
                        }
                    }
                }
                if (Unique) {
                    NewArrayNodeChildrens.push(LocalArrayNodesChildrens[i][j])
                }
            } else {
                NewArrayNodeChildrens.push(LocalArrayNodesChildrens[i][j])
            }
        }
        NewArrayNodesChildrens.push(NewArrayNodeChildrens);
    }
    return NewArrayNodesChildrens;
}

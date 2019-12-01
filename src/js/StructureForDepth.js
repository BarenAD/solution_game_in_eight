import Node from "./Node";
import StepGenerator from "./StepGenerator";

export default class StructureForDepth
{
    constructor(in_start_state, function_update_steps, function_finish)
    {
        this.function_update_steps = function_update_steps;
        this.function_finish = function_finish;
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
            for(let i = 0; i < ChildrensStates.length; i++) {
                this.ROOT.add_children(new Node(this.current, ChildrensStates[i]));
            }
        }
    }

    __check_congratulations(in_state)
    {
        let HeightMatrix = in_state.length;
        let TrueStep = 0;
        for (let i = 0; i < HeightMatrix; i++){
            for(let j = 0; j < HeightMatrix; j++) {
                if (in_state[i][j] === TrueStep) {
                    TrueStep++;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    find_solution()
    {
        let STOP_MACHINE = false;
        let EMERGENCY_EXIT = false;
        while (!STOP_MACHINE && this.steps < 10000 && !this.__check_congratulations(this.current.get_state())){
            let amount_ways = this.current.get_amount_childrens();
            if (amount_ways < 1){
                let NewChildrensStates = StepGenerator(this.current.get_state());
                NewChildrensStates = this.check_on_repeat(NewChildrensStates);
                for(let i = 0; i < NewChildrensStates.length; i++) {
                    this.current.add_children(new Node(this.current, NewChildrensStates[i]));
                }
            }
            //**********************************************************************
            let next_way = this.current.get_first_children();
            if (next_way === null) {
                if (this.current.get_parent() !== null) {
                    this.current = this.current.get_parent();
                } else {
                    STOP_MACHINE = true;
                    EMERGENCY_EXIT = true;
                }
            } else {
                this.current = next_way;
                if (this.__check_congratulations(this.current.get_state())) {
                    STOP_MACHINE = true;
                    // this.Find_Solution.push(this.current);
                }
            }
            if (this.steps % 10 === 0) {
                this.function_update_steps(this.steps);
                this.steps++;
            } else {
                this.steps++;
            }
        }
        if (EMERGENCY_EXIT) {
            // console.log("Решение не найдено :[");
            // console.log(this.steps);
            this.function_finish(this.steps, null);
            //setTimeout(() => {this.function_finish(this.steps, null)}, 2000,);
        } else {
            // console.log(this.steps);
            this.function_finish(this.steps, this.current);
            //setTimeout(() => {this.function_finish(this.steps, this.current)}, 2000,);
        }
    }

    check_on_repeat(array_states)
    {
        let GoUp = this.current.get_parent();
        let EMERGENCY_EXIT = false;
        //let InsideArrayStates = create_copy_array_states(array_states, 3);
        let InsideArrayStates = array_states;
        while(GoUp !== null && !EMERGENCY_EXIT){
            let GoUpState = GoUp.get_state();
            let IdentitytesIndexs = [];
            for(let i = 0; i < InsideArrayStates.length; i++){
                if (this.check_states_on_identity(GoUpState, InsideArrayStates[i])){
                    IdentitytesIndexs.push(i);
                }
            }
            if (IdentitytesIndexs.length > 0) {
                let NewArray = [];
                for(let i = 0; i < InsideArrayStates.length; i++){
                    if (IdentitytesIndexs.find(index => index === i) === undefined){
                        NewArray.push(InsideArrayStates[i]);
                    }
                }
                InsideArrayStates = NewArray;
            }
            GoUp = GoUp.get_parent();
        }
        return InsideArrayStates;
    }

    check_states_on_identity(state1, state2)
    {
        let HeightMatrix1 = state1.length;
        let HeightMatrix2 = state2.length;
        if (HeightMatrix1 !== HeightMatrix2){
            return false;
        }
        for (let i = 0; i < HeightMatrix1; i++){
            for(let j = 0; j < HeightMatrix1; j++) {
                if (state1[i][j] !== state2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}

function create_copy_array_states(array_states, size_matrix_states) {
    let NewArrayStates = [];
    for(let i = 0; i < array_states.length; i++){
        let NewState = [];
        for(let j = 0; j < size_matrix_states; j++){
            NewState.push(array_states[i][j].slice());
        }
        NewArrayStates.push(NewState);
    }
    return NewArrayStates;
}

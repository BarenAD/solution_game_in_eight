import check_states_on_identity from "./CheckStatesOnIdentity";

export default function check_on_repeat_to_up_branch(in_node, array_states)
{
    let GoUp = in_node.get_parent();
    let InsideArrayStates = array_states;
    while(GoUp !== null){
        let GoUpState = GoUp.get_state();
        let IdentitytesIndexs = [];
        for(let i = 0; i < InsideArrayStates.length; i++){
            if (check_states_on_identity(GoUpState, InsideArrayStates[i])){
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

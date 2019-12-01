export default function check_states_on_identity(state1, state2)
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

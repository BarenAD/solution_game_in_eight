export default function StepGenerator (in_state) {
    let SizeMatrix = in_state.length;
    let IndexOfNullInMatrix = {};
    for(let i = 0; i < SizeMatrix; i++){
        for(let j = 0; j < SizeMatrix; j++){
            if (in_state[i][j] === 0) {
                IndexOfNullInMatrix = {
                    row: i,
                    column: j
                };
                i = SizeMatrix;
                j = SizeMatrix;
            }
        }
    }
    let ResultStates = [];
    let OffsetRow = 0;
    let OffsetColumn = 0;
    for (let i = 0; i < 4; i++){
        switch (i) {
            case 0:
                OffsetRow = 1;
                OffsetColumn = 0;
            break;
            case 1:
                OffsetRow = -1;
                OffsetColumn = 0;
            break;
            case 2:
                OffsetRow = 0;
                OffsetColumn = 1;
            break;
            case 3:
                OffsetRow = 0;
                OffsetColumn = -1;
            break;
            default:
            break;
        }
        if (((IndexOfNullInMatrix.row + OffsetRow) >= 0 && (IndexOfNullInMatrix.row + OffsetRow) < SizeMatrix) &&
        ((IndexOfNullInMatrix.column + OffsetColumn) >= 0 && (IndexOfNullInMatrix.column + OffsetColumn) < SizeMatrix)){
            let NewState = create_copy(in_state, SizeMatrix);
            NewState[IndexOfNullInMatrix.row][IndexOfNullInMatrix.column] = NewState[IndexOfNullInMatrix.row+OffsetRow][IndexOfNullInMatrix.column+OffsetColumn];
            NewState[IndexOfNullInMatrix.row+OffsetRow][IndexOfNullInMatrix.column+OffsetColumn] = 0;
            ResultStates.push(NewState);
        }
    }
    return ResultStates;
}

function create_copy(array_arrays, size_matrix) {
    let NewArray = [];
    for(let i = 0; i < size_matrix; i++){
        NewArray.push(array_arrays[i].slice());
    }
    return NewArray;
}

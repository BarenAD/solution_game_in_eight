import Node from "./Node";

export default class StructureForDepth
{
    constructor(in_start_state)
    {
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
        }
    }
}

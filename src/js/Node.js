export default class Node
{
    constructor(in_parent, in_state)
    {
        this.parent = in_parent;
        this.state = in_state;
        this.childrens = [];
        this.childrens_passed = [];
    }

    get_parent()
    {
        return this.parent;
    }

    get_state()
    {
        return this.state;
    }

    add_children(in_children)
    {
        this.childrens.push(in_children);
        this.childrens_passed.push(false);
    }

    get_all_childrens()
    {
        return this.childrens;
    }

    get_first_children()
    {
        let length = this.childrens.length;
        if (length > 0){
            for (let i = 0; i < length; i++)
            {
                if (this.childrens[i] !== null && !this.childrens_passed[i]){
                    this.childrens_passed[i] = true;
                    return this.childrens[i];
                }
            }
        }
        return null;
    }

    get_amount_childrens()
    {
        return this.childrens.length;
    }
}

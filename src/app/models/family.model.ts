export class FamilyModel {
    public id: string;
    public description: string;

    constructor(params: {
        id?: string,
        description?: string
    } = {}) {
        this.id = params.id || '';
        this.description = params.description || '';
    }
}
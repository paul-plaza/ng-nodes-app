export class DialogModel<T> {
    title: string;
    message: string;
    type: TypeModal;
    responseConfirm: boolean;
    data?: T;

    constructor(params: {
        title?: string,
        message?: string,
        type?: TypeModal,
        responseConfirm?: boolean,
        data?: T
    } = {}) {

        this.title = params.title || '';
        this.message = params.message || '';
        this.type = params.type === undefined ? TypeModal.Alert : params.type;
        this.responseConfirm = !!params.responseConfirm;
        this.data = params.data;
    }
}

export enum TypeModal {
    Alert,
    Confirm,
    Information,
    ConfirmWithObservation
}
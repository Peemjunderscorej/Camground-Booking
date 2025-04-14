export class Booking {
    constructor(initializer) {
        this._id = undefined;
        this.user = '';
        this.hospital = '';
        this.createdAt = new Date();
        this.arriving = new Date();
        this.departing = new Date();

   
   

        if (!initializer) return;
        if (initializer._id) this._id = initializer._id;
        if (initializer.user) this.user = initializer.user;
        if (initializer.hospital) this.hospital = initializer.hospital;
        if (initializer.createdAt) this.createdAt = initializer.createdAt;
        if (initializer.arriving) this.arriving = initializer.arriving;
        if (initializer.departing) this.departing = initializer.departing;


    }

    get isNew() {
        return this._id === undefined;
    }
}

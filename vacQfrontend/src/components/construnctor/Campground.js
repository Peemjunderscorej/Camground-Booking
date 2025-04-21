export class Campground {
    constructor(initializer) {
        this._id = undefined;
        this.name = '';
        this.address = '';
        this.tel = undefined;
        this.imageUrl = '';
        this.isActive = false;
        this.availableDays = [];
   
   

        if (!initializer) return;
        if (initializer._id) this._id = initializer._id;
        if (initializer.name) this.name = initializer.name;
        if (initializer.address) this.address = initializer.address;
        if (initializer.tel) this.tel = initializer.tel;
        if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
        if (initializer.isActive) this.isActive = initializer.isActive;
        if (Array.isArray(initializer.availableDays)) this.availableDays = initializer.availableDays;

    }

    get isNew() {
        return this._id === undefined;
    }
}

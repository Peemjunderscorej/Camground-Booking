export class Campground {
    constructor(initializer) {
        this.id = undefined;
        this.name = '';
        this.address = '';
        this.tel = undefined;
        this.imageUrl = '';
        this.contractSignedOn = new Date();
        this.isActive = false;

        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;
        if (initializer.address) this.address = initializer.address;
        if (initializer.tel) this.tel = initializer.tel;
        if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
        if (initializer.contractSignedOn) this.contractSignedOn = new Date(initializer.contractSignedOn);
        if (initializer.isActive) this.isActive = initializer.isActive;
    }

    get isNew() {
        return this.id === undefined;
    }
}

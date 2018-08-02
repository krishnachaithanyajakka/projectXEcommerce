export class Customer{
    private id : String;
	private name: String;
	private email: String;
	private password: String;
	private pincode: String;
	private contact: String;
	private createdTime : String;
	private createdBy: String;
	private updatedTime: String;
	private updatedBy: String;
	private image: String;
	private loginStatus: boolean
    
    public getId() {
		return this.id;
	}

	public setId(id: String) {
		this.id = id;
	}

	public getName() {
		return this.name;
	}

	public setName(name: String) {
		this.name = name;
	}

	public getEmail() {
		return this.email;
	}

	public setEmail(email: String) {
		this.email = email;
	}

	public getPassword() {
		return this.password;
	}

	public setPassword(password: String) {
		this.password = password;
	}

	public getPincode() {
		return this.pincode;
	}

	public setPincode(pincode: String) {
		this.pincode = pincode;
	}

	public getContact() {
		return this.contact;
	}

	public setContact(contact: String) {
		this.contact = contact;
	}

	public getCreatedTime() {
		return this.createdTime;
	}

	public setCreatedTime(createdTime: String) {
		this.createdTime = createdTime;
	}

	public getCreatedBy() {
		return this.createdBy;
	}

	public setCreatedBy(createdBy: String) {
		this.createdBy = createdBy;
	}

	public getUpdatedTime() {
		return this.updatedTime;
	}

	public setUpdatedTime(updatedTime: String) {
		this.updatedTime = updatedTime;
	}

	public getUpdatedBy() {
		return this.updatedBy;
	}

	public setUpdatedBy(updatedBy: String) {
		this.updatedBy = updatedBy;
	}
	public getImage() {
		return this.image;
	}

	public setImage(image: String) {
		this.image = image;
	}
	public setLoginStatus(loginStatus: boolean){
		this.loginStatus=loginStatus;
	}
	public getLoginStatus(){
		return this.loginStatus;
	}
}
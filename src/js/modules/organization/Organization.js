class Organization {
  #companyName;

  #telephone;

  #email;

  #employeesList;

  #address;

  #website;

  #CEO;

  constructor(
    companyName,
    email,
    telephone,
    employeesList,
    address,
    website,
    CEO
  ) {
    this.#companyName = companyName;
    this.#email = email;
    this.#telephone = telephone;
    this.#employeesList = employeesList;
    this.#address = address;
    this.#website = website;
    this.#CEO = CEO;
  }

  getInfo() {
    return {
      companyName: this.#companyName,
      email: this.#companyName,
      tel: this.#telephone,
      employeesList: this.#employeesList,
      website: this.#website,
      CEO: this.#CEO,
    };
  }

  get companyName() {
    return this.#companyName;
  }

  set companyName(newName) {
    this.#companyName = newName;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  get telephone() {
    return this.#telephone;
  }

  set telephone(newTelephone) {
    this.#telephone = newTelephone;
  }

  get employeesList() {
    return this.#employeesList;
  }

  set employeesList(newEmployeesList) {
    this.#employeesList = newEmployeesList;
  }

  get address() {
    return this.#address;
  }

  set address(newAddress) {
    this.#address = newAddress;
  }

  get website() {
    return this.#website;
  }

  set website(newWebsite) {
    this.#website = newWebsite;
  }

  get CEO() {
    return this.#CEO;
  }

  set CEO(newCEO) {
    this.#CEO = newCEO;
  }

  destroy() {
    // Очищаємо поля
    this.#companyName = null;
    this.#email = null;
    this.#telephone = null;
    this.#employeesList = null;
    this.#address = null;
    this.#website = null;
    this.#CEO = null;
    // Видаляємо клас
    delete this;
  }
}
export default Organization;

/* eslint-disable class-methods-use-this */

export default class Human {
  // Імена з # це щось на кшталт приватних свойств класса
  #email;

  #name;

  #gender;

  #telephone;

  #company;

  constructor(name, gender, email, telephone, company) {
    this.#name = name;
    this.#gender = gender;
    this.#email = email;
    this.#telephone = telephone; // Тут повиннен приходити массив
    this.#company = company;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.#name === "" || !this.#telephone) {
      throw new Error("We can't create class human");
    } else if (!regexEmail.test(this.#email)) {
      throw new Error(
        "You entered the wrong e-mail. Template for email example@gmail.com"
      );
    }
  }

  getFullInfo() {
    return {
      name: this.#name,
      gender: this.#gender,
      telephone: this.#telephone,
      email: this.#email,
    };
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get gender() {
    return this.#gender;
  }

  set gender(newGender) {
    this.#gender = newGender;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  get company() {
    return this.#company;
  }

  set company(newCompany) {
    this.#company = newCompany;
  }

  get telephone() {
    return this.#telephone;
  }

  set telephone(newTelephone) {
    this.#telephone = newTelephone;
  }

  get firstTelephone() {
    return this.#telephone[0];
  }

  set firstTelephone(newNumber) {
    this.#telephone[0] = newNumber;
  }

  get secondTelephone() {
    return this.#telephone[1];
  }

  set secondTelephone(newNumber) {
    this.#telephone[1] = newNumber;
  }

  destroy() {
    // Очищаємо поля
    this.#name = null;
    this.#gender = null;
    this.#email = null;
    this.#telephone = null;
    this.#company = null;
    // Видаляємо клас

    delete this;
  }
}

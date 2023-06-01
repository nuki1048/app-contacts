class Telephone {
  #telephone;

  constructor(telephone) {
    this.#telephone = telephone;
  }

  get telephone() {
    return this.#telephone;
  }

  set telephone(newTelephone) {
    if (newTelephone !== "") {
      this.#telephone = newTelephone;
    }
  }

  validatePhoneNumber() {
    // Видаляємо всі символи, окрім цифр
    let cleaned = `${this.#telephone}`.replace(/\D/g, "");

    // Якщо номер телефону є валідним, але містить більше 10 цифр, обрізаємо його до 10 цифр
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  }
}
export default Telephone;

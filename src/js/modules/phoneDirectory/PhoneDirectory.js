/* eslint-disable class-methods-use-this */

import httpService from "../../services/http";
import Company from "../company/Company";
import Contact from "../contact/Contact";
import Telephone from "../telephone/Telephone";

export default class PhoneDirectory {
  #model;

  #category;

  #firstName;

  #lastName;

  #company;

  #telephone;

  #email;

  #data;

  #filter;

  #dataCompanies;

  #gender;

  #favorites;

  #companyName;

  #companyCEO;

  #companyWebsite;

  #companyAddress;

  #CompanyTelephone;

  #CompanyEmail;

  #companyEmployees;

  #FilterCompanies;

  constructor(model, category) {
    this.#model = model;
    this.#category = category;
    // Contact info
    this.#firstName = "";
    this.#lastName = "";
    this.#company = "";
    this.#telephone = [null, null]; // Перший це робочий телефон, другий це личний щось на кшталт
    this.#email = "";
    this.#filter = "";
    this.#data = [];
    this.#gender = "Male";
    this.#favorites = false;

    // Company info
    this.#dataCompanies = [];
    this.#CompanyEmail = "";
    this.#CompanyTelephone = "";
    this.#companyAddress = "";
    this.#companyName = "";
    this.#companyWebsite = "";
    this.#companyCEO = "";
    this.#FilterCompanies = "";

    if (this.#model === "" || this.#category === "") {
      throw new Error("Can't create a class Telephone");
    }
  }

  #addNewContact() {
    const btn = document.querySelector(".search__block-addBtn");
    try {
      btn.addEventListener("click", (e) => {
        if (e.target.classList.contains("search__block-addBtn")) {
          const popup = document.createElement("div");
          popup.classList.add(
            "popup",
            "popup__form_newContact",
            "animate__animated",
            "animate__fadeInDown"
          );
          popup.innerHTML = `
            <div class="form__newContact_info">
               <a href="#" class="form__newContact_cancel">Cancel</a>
               <h3 class="form__newContact_title">New contact</h3>
               <a  href="#"  class="form__newContact_done">
                  Done
               </a>
            </div>
            <div class="form__newContact_avatar">
               <img
                  src="./icons/contacts/newContactIcon.svg"
                  alt="Avatar"
               />
            </div>
            <form action="#" class="form__newContact_inputs">
               <input
               required
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  class="input input__firstName"
               />
               <input
               required
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  class="input input__lastName"
               />
               <input
               required
                  placeholder="Company"
                  type="text"
                  name="company"
                  class="input input__company"
               />
               <input
               required
                  placeholder="Work tel-number"
                  type="tel"
                  name="telephone"
                  class="input input__telephone_work"
               />
               <input
               required
                  placeholder="Tel-number"
                  type="tel"
                  name="homeTelephone"
                  class="input input__telephone"
               />
               <input
               required
                  placeholder="Email"
                  type="email"
                  name="email"
                  class="input input__email"
               />
                 <div class="checkbox-wrapper-4">
                    <input type="checkbox" id="gender" class="inp-cbx input__gender">
                    <label for="gender" class="cbx"><span>
                    <svg height="10px" width="12px">
                      
                    </svg></span><span>Gender(default male)</span></label>
                    <svg class="inline-svg">
                      <symbol viewBox="0 0 12 10" id="check-4">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                </div>
                <div class="checkbox-wrapper-4">
                    <input type="checkbox" id="favorites" class="inp-cbx input__favorites">
                    <label for="favorites" class="cbx"><span>
                    <svg height="10px" width="12px">
                      
                    </svg></span><span>Favorites?</span></label>
                    <svg class="inline-svg">
                      <symbol viewBox="0 0 12 10" id="check-4">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </symbol>
                    </svg>
                </div>
               </form>
            <a href="#" class="mockup__homeIndicator"></a>`;
          document.querySelector(".mockup__contacts").append(popup);

          popup.style.display = "block";
          // eslint-disable-next-line consistent-return
          popup.addEventListener("click", (event) => {
            if (
              event.target.classList.contains("form__newContact_cancel") ||
              event.target.classList.contains("mockup__homeIndicator")
            ) {
              document.querySelector(".form__newContact_cancel");
              popup.classList.remove("animate__fadeInDown");
              popup.classList.add("animate__fadeOutUp");
              setTimeout(() => {
                popup.remove();
              }, 500);
            } else if (
              event.target.classList.contains("form__newContact_done")
            ) {
              const id = Math.floor(Math.random() * (100 - 1) + 1);
              const body = JSON.stringify({
                name: `${this.#firstName} ${this.#lastName}`,
                tel: this.#telephone,
                company: this.#company,
                email: this.#email,
                gender: this.#gender,
                favorites: this.#favorites,
                id,
              });
              try {
                httpService(
                  `https://645636932e41ccf16916a499.mockapi.io/contacts`,
                  "POST",
                  body
                );
                new Contact(
                  `${this.#firstName} ${this.#lastName}`,
                  this.#gender,
                  this.#email,
                  this.#telephone,
                  this.#company,
                  id
                ).renderToDOM();
                this.resetValues();
              } catch (error) {
                throw new Error(error);
              }

              popup.classList.remove("animate__fadeInDown");
              popup.classList.add("animate__fadeOutUp");
              setTimeout(() => {
                popup.remove();
              }, 500);
            }
          });
          popup.addEventListener("input", (eventN) => {
            this.#validate(eventN);
          });
        }
      });
    } catch (e) {
      /* empty */
    }
  }

  #addNewCompany() {
    const html = `
      <div class="form__newCompany_info">
         <a href="#" class="form__newCompany_cancel">Cancel</a>
         <h3 class="form__newCompany_title">New company</h3>
         <div class="form__newCompany_done">Done</div>
      </div>
      <div class="form__newCompany_avatar">
         <img
            src="./icons/contacts/newContactIcon.svg"
            alt="Avatar"
         />
      </div>
      <form action="#" class="form__newCompany_inputs">
         <input
            placeholder="Name of company"
            type="text"
            name="nameCompany"
            class="input input__companyName"
         />
         <input
            placeholder="Web-site"
            type="url"
            name="website"
            class="input input__website"
         />
         <input
            placeholder="Address"
            type="text"
            name="address"
            class="input input__companyAddress"
         />
         <input
            placeholder="Tel-number"
            type="tel"
            name="tel"
            class="input input__companyTelephone"
         />
         <input
            placeholder="Email"
            type="email"
            class="input input__companyEmail"
            name="email"
         />
          <input
            placeholder="CEO"
            type="text"
            class="input input__CEO"
            name="ceo"
         />
         <input
            placeholder="Employees, example: Nikita KKK, Yuri AAA, ..."
            type="text"
            class="input input__companyEmployees"
            name="employees"
         />
      </form>
      <a href="#" class="mockup__homeIndicator"></a>`;
    const popup = document.createElement("div");
    popup.classList.add("popup", "popup__form_newCompany", "animate__animated");
    popup.innerHTML = html;
    try {
      document
        .querySelector(".search__block-addCompanyBtn")
        .addEventListener("click", () => {
          popup.classList.add("animate__fadeInDown");
          document.querySelector(".mockup__contacts").append(popup);
          popup.style.display = "block";
        });
    } catch (e) {
      /* empty */
    }
    // eslint-disable-next-line consistent-return
    popup.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("mockup__homeIndicator") ||
        e.target.classList.contains("form__newCompany_cancel")
      ) {
        popup.classList.remove("animate__fadeInDown");
        popup.classList.add("animate__fadeOutUp");
        setTimeout(() => {
          popup.remove();
        }, 500);
      } else if (e.target.classList.contains("form__newCompany_done")) {
        const id = Math.floor(Math.random() * (100 - 1) + 1);

        const body = JSON.stringify({
          companyName: this.#companyName,
          tel: this.#CompanyTelephone,
          website: this.#companyWebsite,
          email: this.#CompanyEmail,
          address: this.#companyAddress,
          employees: this.#companyEmployees
            ? this.#companyEmployees.split(",")
            : [],
          CEO: this.#companyCEO,
          id,
        });
        httpService(
          `https://645636932e41ccf16916a499.mockapi.io/companies`,
          "POST",
          body
        );
        popup.classList.remove("animate__fadeInDown");
        popup.classList.add("animate__fadeOutUp");
        setTimeout(() => {
          popup.remove();
        }, 500);
        try {
          new Company(
            this.#companyName,
            this.#CompanyEmail,
            this.#CompanyTelephone,
            this.#companyEmployees.split(","),
            this.#companyAddress,
            this.#companyWebsite,
            this.#companyCEO,
            id
          ).renderToDOM();
          // this.resetValues();
        } catch (error) {
          throw new Error(error);
        }
      }
    });
    popup.addEventListener("input", (e) => {
      this.#validate(e);
    });
  }

  #validate(event) {
    switch (event.target.classList[1]) {
      case "input__firstName":
        this.#firstName = event.target.value;
        break;
      case "input__lastName":
        this.#lastName = event.target.value;
        break;
      case "input__company":
        this.#company = event.target.value;
        break;
      case "input__telephone":
        this.#telephone[1] = event.target.value;
        break;
      case "input__telephone_work":
        this.#telephone[0] = event.target.value;
        break;
      case "input__email":
        this.#email = event.target.value;
        break;
      case "input__gender":
        // eslint-disable-next-line no-unused-expressions
        this.#gender = event.target.checked ? "Female" : "Male";
        break;
      case "input__favorites":
        this.#favorites = event.target.checked;
        break;
      case "input__companyName":
        this.#companyName = event.target.value;
        break;
      case "input__website":
        this.#companyWebsite = event.target.value;
        break;
      case "input__companyEmail":
        this.#CompanyEmail = event.target.value;
        break;
      case "input__companyTelephone":
        this.#CompanyTelephone = event.target.value;
        break;
      case "input__companyAddress":
        this.#companyAddress = event.target.value;
        break;
      case "input__companyEmployees":
        this.#companyEmployees = event.target.value;
        break;
      case "input__CEO":
        this.#companyCEO = event.target.value;
        break;
      default:
        throw new Error("Error,not found this input");
    }
  }

  resetValues() {
    this.#firstName = "";
    this.#lastName = "";
    this.#company = "";
    this.#telephone = [null, null]; // Перший це робочий телефон, другий це личний щось на кшталт
    this.#email = "";
    this.#filter = "";
    this.#gender = "Male";
    this.#favorites = false;

    // Company info
    this.#CompanyEmail = "";
    this.#CompanyTelephone = "";
    this.#companyAddress = "";
    this.#companyName = "";
    this.#companyWebsite = "";
    this.#companyCEO = "";
    this.#FilterCompanies = "";
  }
  // eslint-disable-next-line no-unused-vars

  #renderContactsListToDom(data = this.#data) {
    if (this.#filter === "") {
      try {
        document.querySelector(".contacts__list_grid").innerHTML = "";
      } catch (e) {
        /* empty */
      }
      return data.map((item) => {
        new Contact(
          item.name,
          item.gender,
          item.email,
          item.tel,
          item.company,
          item.id
        ).renderToDOM();
        return this.#checkCompany(item.name, item.company);
      });
    }
    document.querySelector(".contacts__list_grid").innerHTML = "";
    return data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(this.#filter.toLowerCase()) ||
          item.email.toLowerCase().includes(this.#filter.toLowerCase()) ||
          (item.tel[0] &&
            item.email.toLowerCase().includes(this.#filter.toLowerCase())) ||
          (item.tel[1] &&
            item.email.toLowerCase().includes(this.#filter.toLowerCase()))
      )
      .map((item) =>
        new Contact(
          item.name,
          item.gender,
          item.email,
          item.tel,
          item.company,
          item.id
        ).renderToDOM()
      );
  }

  // eslint-disable-next-line consistent-return
  #renderFavorites() {
    // eslint-disable-next-line array-callback-return
    try {
      // eslint-disable-next-line array-callback-return
      return this.#data.map((human) => {
        if (human.favorites) {
          const parent = document.querySelector(".contacts__list_favorites");
          const html = `
      <img
        src="./img/profile.jpg"
        alt=""
        class="favorites__card_avatar favorites__card_avatar-active"
      />
      <h3 class="favorites__card_title">${human.name}</h3>
      <a href="tel:+19114728921" class="favorites__card_telephone"
        >${new Telephone(human.tel).validatePhoneNumber()}</a
      >
      <div class="favorites__card_actions">
        <div class="actions__callBtn">
          <img src="./icons/contacts/callIcon.svg" alt="call btn" />
        </div>
        <div class="actions__messageBtn">
          <img
            src="./icons/contacts/messageIcon.svg"
            alt="message btn"
          />
        </div>
      </div>
    `;
          const div = document.createElement("div");
          div.classList.add(
            "favorites__card",
            "animate__animated",
            "animate__fadeIn"
          );
          div.innerHTML = html;
          parent.append(div);
        }
      });
    } catch (e) {
      /* empty */
    }
  }

  #renderCompaniesListToDom(data = this.#dataCompanies) {
    // eslint-disable-next-line no-unused-expressions

    if (this.#FilterCompanies === "") {
      try {
        document.querySelector(".contacts__companies_grid").innerHTML = "";
      } catch (e) {
        /* empty */
      }
      return data.map((company) =>
        new Company(
          company.companyName,
          company.email,
          company.tel,
          company.employees,
          company.address,
          company.website,
          company.CEO,
          company.id
        ).renderToDOM()
      );
    }
    document.querySelector(".contacts__companies_grid").innerHTML = "";
    return data
      .filter((item) =>
        item.companyName
          .toLowerCase()
          .includes(this.#FilterCompanies.toLowerCase())
      )
      .map((company) =>
        new Company(
          company.companyName,
          company.email,
          company.tel,
          company.employees,
          company.address,
          company.website,
          company.id
        ).renderToDOM()
      );
  }

  #setFilter() {
    const input = document.querySelector(".search__block-mainInput .list");
    try {
      input.addEventListener("input", (e) => {
        this.#filter = e.target.value;
        this.#renderContactsListToDom();
      });
    } catch (e) {
      /* empty */
    }
  }

  #setFilterCompanies() {
    const input = document.querySelector(".search__block-mainInput");
    try {
      input.addEventListener("input", (e) => {
        this.#FilterCompanies = e.target.value;
        this.#renderCompaniesListToDom();
      });
    } catch (e) {
      /* empty */
    }
  }

  #setCounter() {
    const counterContacts = this.#data.length;
    const counterCompanies = this.#dataCompanies.length;
    try {
      document.querySelector(
        ".profile__info_counter_list"
      ).innerHTML = `${counterContacts} contacts`;

      document.querySelector(
        ".profile__info_activeCounter_list"
      ).innerHTML = `${counterContacts} active`;
      document.querySelector(
        ".profile__info_counter_company"
      ).innerHTML = `${counterCompanies} companies`;
      document.querySelector(
        ".profile__info_activeCounter_company"
      ).innerHTML = `${counterCompanies} active`;
    } catch (e) {
      /* empty */
    }
  }

  #checkCompany(name, companyName) {
    const result = this.#dataCompanies.find(
      (item) => item.companyName.toLowerCase() === companyName.toLowerCase()
    );

    if (result && !result.employees.find((item) => item === name)) {
      const index = this.#dataCompanies.indexOf(result);
      this.#dataCompanies[index].employees.push(name);
      return httpService(
        `https://645636932e41ccf16916a499.mockapi.io/companies/${
          this.#dataCompanies[index].id
        }`,
        "PUT",
        JSON.stringify(this.#dataCompanies[index])
      );
    }
    return null;
  }
  // eslint-disable-next-line getter-return, class-methods-use-this

  async render() {
    await httpService(
      "https://645636932e41ccf16916a499.mockapi.io/contacts"
      // eslint-disable-next-line no-return-assign
    ).then((res) => (this.#data = [...res]));
    await httpService(
      "https://645636932e41ccf16916a499.mockapi.io/companies"
      // eslint-disable-next-line no-return-assign
    ).then((res) => (this.#dataCompanies = [...res]));
    this.#setCounter();
    this.#addNewContact();
    this.#renderFavorites();
    this.#addNewCompany();
    this.#renderContactsListToDom();
    this.#renderCompaniesListToDom();
    this.#setFilter();
    this.#setFilterCompanies();
  }
}

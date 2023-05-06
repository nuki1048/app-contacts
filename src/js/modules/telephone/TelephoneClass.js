/* eslint-disable class-methods-use-this */

import httpSevice from "../../services/http";
import Human from "../human/Human";

export default class Telephone {
   #model;

   #category;

   #firstName;

   #lastName;

   #company;

   #telephone;

   #email;

   #data;

   #filter;

   constructor(model, category) {
      this.#model = model;
      this.#category = category;
      this.#firstName = "";
      this.#lastName = "";
      this.#company = "";
      this.#telephone = "";
      this.#email = "";
      this.#filter = "";
      this.#data = [];
      if (this.#model === "" || this.#category === "") {
         throw new Error("Can't create a class Telephone");
      }
   }

   #renderOnServer() {
      httpSevice(
         `https://645636932e41ccf16916a499.mockapi.io/category`,
         "POST",
         JSON.stringify(this.#category)
      );
   }

   #addNewContact() {
      const btn = document.querySelector(".search__block-addBtn");
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
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  class="input input__firstName"
               />
               <input
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  class="input input__lastName"
               />
               <input
                  placeholder="Company"
                  type="text"
                  name="company"
                  class="input input__company"
               />
               <input
                  placeholder="Tel-number"
                  type="text"
                  name="telephone"
                  class="input input__telephone"
               />
               <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  class="input input__email"
               />
            </form>
            <a href="#" class="mockup__homeIndicator"></a>`;
            document.querySelector(".mockup__contacts").append(popup);

            popup.style.display = "block";
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
                     id,
                  });
                  httpSevice(
                     `https://645636932e41ccf16916a499.mockapi.io/contacts`,
                     "POST",
                     body
                  );
                  popup.classList.remove("animate__fadeInDown");
                  popup.classList.add("animate__fadeOutUp");
                  setTimeout(() => {
                     popup.remove();
                  }, 500);
                  new Human(
                     `${this.#firstName} ${this.#lastName}`,
                     "Male",
                     this.#email,
                     this.#telephone,
                     id
                  ).renderToDOM();
                  this.render();
               }
            });
            popup.addEventListener("input", (eventN) => {
               this.#validate(eventN);
            });
         }
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
            this.#telephone = event.target.value;
            break;
         case "input__email":
            this.#email = event.target.value;
            break;
         default:
            throw new Error("Error,not found this input");
      }
   }

   async #fetchData() {
      const res = await httpSevice(
         `https://645636932e41ccf16916a499.mockapi.io/contacts`
      );
      this.#data = [...this.#data, ...res];
   }

   #renderListToDom(data = this.#data) {
      document.querySelector(".contacts__list_grid").innerHTML = "";
      if (this.#filter === "") {
         return data.map((item) => {
            const gender = "male";
            return new Human(
               item.name,
               gender,
               item.email,
               item.tel,
               item.id
            ).renderToDOM();
         });
      }
      return data
         .filter(
            (item) =>
               item.name.toLowerCase().includes(this.#filter.toLowerCase()) ||
               item.email.toLowerCase().includes(this.#filter.toLowerCase()) ||
               item.tel.toLowerCase().includes(this.#filter.toLowerCase())
         )
         .map((item) => {
            const gender = "male";
            return new Human(
               item.name,
               gender,
               item.email,
               item.tel,
               item.id
            ).renderToDOM();
         });
   }

   #setFilter() {
      const input = document.querySelector(".search__block-mainInput");
      input.addEventListener("input", (e) => {
         this.#filter = e.target.value;
         console.log(this.#filter);
         this.#renderListToDom();
      });
   }

   // eslint-disable-next-line getter-return, class-methods-use-this
   async render() {
      await this.#fetchData();
      this.#addNewContact();
      this.#renderListToDom();
      this.#setFilter();
   }
}

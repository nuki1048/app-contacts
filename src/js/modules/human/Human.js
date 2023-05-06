/* eslint-disable class-methods-use-this */
import httpSevice from "../../services/http";

export default class Human {
   // Імена з # це щось на кшталт приватних свойств класса
   #email;

   #name;

   #gender;

   #id;

   #telephone;

   constructor(name, gender, email, telephone, id) {
      this.nameForModal = name;
      this.#name = name;
      this.#gender = gender;
      this.#email = email;
      this.#telephone = telephone;
      this.#id = id;
      // const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // const regexTelephone = /^\+1\d{10}$/g;

      if (
         this.#name === "" ||
         this.#gender === "" ||
         this.#email === "" ||
         this.#telephone === ""
      ) {
         throw new Error("We can't create class human");
         // } else if (!regexEmail.test(this.#email)) {
         //    throw new Error(
         //       "You entered the wrong e-mail. Template for email example@google.com"
         //    );
         // } else if (!regexTelephone.test(this.#telephone)) {
         //    throw new Error(
         //       `You entered the wrong telephone. Template for telephone: +10123456789, your phone is: ${
         //          this.#telephone
         //       }`
         //    );
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

   openPopupInfo(name, telephone, id) {
      const popup = document.createElement("div");
      const validatedNumber = telephone.replace(
         /^\+1(\d{3})(\d{3})(\d{4})$/,
         "+1 ($1) $2-$3"
      );
      popup.classList.add(
         "popup",
         "popup__form_activeContact",
         "animate__animated",
         "animate__fadeInDown"
      );
      popup.innerHTML = `
      <div class="form__activeContact">
         <a href="#" class="form__activeContact_closeBtn">Search</a>
         <div class="form__activeContact_avatar">
            <img
               src="./icons/contacts/newContactIcon.svg"
               alt="Avatar"
            />
         </div>
         <h3 class="form__activeContact_title">${name}</h3>
         <div class="form__activeContact_groupBtns">
            <div class="button button__message">
               <img
                  src="./icons/contacts/messageIcon.svg"
                  alt="Message"
               />
               <p>Message</p>
            </div>
            <div class="button button__call">
               <img
                  src="./icons/contacts/callIconBlue.svg"
                  alt="Call"
               />
               <p>Call</p>
            </div>
            <div class="button button__facetime">
               <img
                  src="./icons/contacts/facetimeIcon.svg"
                  alt="Facetime"
               />
               <p>Facetime</p>
            </div>
            <div class="button button__email">
               <img
                  src="./icons/contacts/emailIcon.svg"
                  alt="Email"
               />
               <p>Facetime</p>
            </div>
            <div class="button button__delete">
               <img src="./icons/contacts/deleteIcon.svg" alt="Delete" />
               <p>Delete</p>
            </div>
         </div>
         <div class="form__activeContact_info">
            <div class="info__block number">
               <div class="number__mobile">
                  <h4 class="number__title">Mobile</h4>
                  <a href="tel:{${telephone.replace(
                     /\+/,
                     ""
                  )}}" class="number__telephone"
                     >${validatedNumber}</a
                  >
               </div>
               <div class="number__home">
                  <h4 class="number__title">Home</h4>
                  <a href="tel:4055550128" class="number__telephone"
                     >(405) 555-0128</a
                  >
               </div>
            </div>
            <div class="info__block email">
               <div>
                  <h3 class="info__title">Email</h3>
                  <div class="email__address">
                     2118 Thornridge Cir. Syracuse, Connecticut
                     35624
                  </div>
               </div>
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500.9215462967168!2d-76.18876753808222!3d43.03330715094304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9f15185b98fef%3A0xd374ea9a67074e7d!2sDunkin&#39;!5e0!3m2!1suk!2sua!4v1682679296216!5m2!1suk!2sua"
                  class="email__map"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
            <div class="info__block notes">
               <textarea
                  placeholder="Notes"
                  name="notes"
                  class="notes__textarea"
               ></textarea>
            </div>
         </div>
      </div>
      <a href="#" class="mockup__homeIndicator"></a>
   `;
      document.querySelector(".mockup__contacts").append(popup);
      popup.style.display = "block";
      popup.addEventListener("click", (event) => {
         if (
            event.target.classList.contains("mockup__homeIndicator") ||
            event.target.classList.contains("form__activeContact_closeBtn")
         ) {
            popup.classList.remove("animate__fadeInDown");
            popup.classList.add("animate__fadeOutUp");
            setTimeout(() => {
               popup.style.display = "none";
               popup.remove();
            }, 500);
         }
      });
      popup.querySelector(".button__delete").addEventListener("click", () => {
         this.delete(id);
      });
   }

   changeName(name) {
      this.renderToServer();
      this.#name = name;
   }

   getName() {
      return this.#name;
   }

   changeEmail(email) {
      this.renderToServer();
      this.#email = email;
   }

   getEmail() {
      return this.#email;
   }

   changeGender(gender) {
      this.#gender = gender;
   }

   getGender() {
      return this.#gender;
   }

   changeTelephone(tel) {
      this.renderToServer();
      this.#telephone = tel;
   }

   getTelephone() {
      return this.#telephone;
   }

   renderToServer() {
      const body = JSON.stringify({
         id: this.#id,
         name: this.#name,
         tel: this.#telephone,
         email: this.#email,
      });
      httpSevice(
         `https://645636932e41ccf16916a499.mockapi.io/contacts/`,
         "POST",
         body
      );
   }

   changeInfoOnServer(obj) {
      httpSevice(
         `https://645636932e41ccf16916a499.mockapi.io/contacts/${this.#id}`,
         "PATCH",
         JSON.stringify(obj)
      );
   }

   delete(id = this.#id) {
      const popup = document.querySelector(".popup__form_activeContact");
      httpSevice(
         `https://645636932e41ccf16916a499.mockapi.io/contacts/${id}`,
         "DELETE"
      )
         .then(() => {
            popup.classList.remove("animate__fadeInDown");
            popup.classList.add("animate__fadeOutUp");
            setTimeout(() => {
               popup.style.display = "none";
               popup.remove();
            }, 500);
         })
         .then(document.querySelector(`[data-id="${this.#id}"]`).remove());
   }

   renderToDOM() {
      const parentSelector = document.querySelector(".contacts__list_grid");
      const li = document.createElement("li");
      li.classList.add("contact");
      li.setAttribute("data-id", this.#id);
      li.innerHTML = `<img
      class="contact__avatar"
      src="./icons/contacts/newContactIcon.svg"
      alt="" />
      <h3 class="contact__title">${this.#name}</h3>
      <div class="contact__actions">
         <div class="actions__callBtn">
            <img
               src="./icons/contacts/callIcon.svg"
               alt="call btn"
            />
         </div>
         <div class="actions__messageBtn">
            <img
               src="./icons/contacts/messageIcon.svg"
               alt="message btn"
            />
         </div>
      </div>`;

      parentSelector.append(li);
      li.addEventListener("click", () => {
         this.openPopupInfo(this.#name, this.#telephone, this.#id);
      });
   }
}

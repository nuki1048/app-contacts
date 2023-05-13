import httpService from "../../services/http";
import Human from "../human/Human";
import Telephone from "../telephone/Telephone";

class Contact extends Human {
  #id;

  constructor(name, gender, email, telephone, company, id) {
    super(name, gender, email, telephone, company);
    this.#id = id;
  }

  // eslint-disable-next-line class-methods-use-this

  openPopupInfo(name, telephone, id) {
    const popup = document.createElement("div");
    const validatedWorkNumber = telephone[0]
      ? new Telephone(telephone[0]).validatePhoneNumber()
      : "Not found";
    const validatedHomeNumber = telephone[1]
      ? new Telephone(telephone[1]).validatePhoneNumber()
      : "Not found";
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
                  <a href="tel:${validatedWorkNumber}" class="number__telephone"
                     >${validatedWorkNumber}</a
                  >
               </div>
               <div class="number__home">
                  <h4 class="number__title">Home</h4>
                  <a href="tel:${validatedHomeNumber}" class="number__telephone"
                     >${validatedHomeNumber}</a
                  >
               </div>
            </div>
            <div class="info__block email">
               <div>
                  <h3 class="info__title">Email</h3>
                  <div class="email__address">
                    ${this.email}
                    ${this.company}
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

  delete(id = this.#id) {
    const popup = document.querySelector(".popup__form_activeContact");
    httpService(
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
      .then(() => document.querySelector(`[data-id="${this.#id}"]`).remove());
  }

  renderToDOM() {
    const parentSelector = document.querySelector(".contacts__list_grid");
    const li = document.createElement("li");
    li.classList.add("contact");
    li.setAttribute("data-id", this.#id);
    li.innerHTML = `
      <img
      class="contact__avatar"
      src="./icons/contacts/newContactIcon.svg"
      alt="" />
      <h3 class="contact__title">${this.name}</h3>
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

    try {
      parentSelector.append(li);
      li.addEventListener("click", () => {
        this.openPopupInfo(this.name, this.telephone, this.#id);
      });
    } catch (e) {
      /* empty */
    }
  }
}
export default Contact;

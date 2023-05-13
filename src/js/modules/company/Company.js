import httpService from "../../services/http";
import Organization from "../organization/Organization";
import Telephone from "../telephone/Telephone";

/* eslint-disable class-methods-use-this */
class Company extends Organization {
  #id;

  constructor(
    companyName,
    email,
    telephone,
    employeesList,
    address,
    website,
    CEO,
    id
  ) {
    super(companyName, email, telephone, employeesList, address, website, CEO);
    this.#id = id;
  }

  renderToDOM() {
    const html = `
      <img
         class="company__avatar"
         src="./icons/contacts/newContactIcon.svg"
         alt=""
      />
      <h3 class="company__title">${this.companyName}</h3>
      <div class="company__actions">
         <a href="#" class="company__actions_more">&#62;</a>
      </div>
  `;
    const li = document.createElement("li");
    li.classList.add("company");
    li.innerHTML = html;
    li.setAttribute("data-company-id", this.#id);
    try {
      document.querySelector(".contacts__companies_grid").append(li);
    } catch (e) {
      /* empty */
    }
    li.addEventListener("click", () => {
      this.openPopupInfo(
        this.#id,
        this.companyName,
        this.website,
        this.telephone,
        this.address,
        this.email,
        this.CEO
      );
    });
  }

  openPopupInfo(id, companyName, website, telephone, address, email, ceo) {
    const validatedTelephone = new Telephone(telephone).validatePhoneNumber();
    const html = `
      <div class="form__activeCompany">
         <a href="#" class="form__activeCompany_closeBtn">Search</a>
         <div class="form__activeCompany_avatar">
            <img
               src="./img/background/wallpaper.png"
               alt="Avatar"
            />
         </div>
         <h3 class="form__activeCompany_title">${companyName}</h3>
         <div class="form__activeCompany_groupBtns">
            <div class="button button__message">
               <img
                  src="./icons/contacts/messageIcon.svg"
                  alt="Message"
               />
               <p>Message</p>
            </div>
            <a href='${validatedTelephone.replace(
              /\D\s/,
              ""
            )}'  class="button button__call">
               <img
                  src="./icons/contacts/callIconBlue.svg"
                  alt="Call"
               />
               <p>Call</p>
            </a>
            <a href="${website}" class="button button__network">
               <img
                  src="./icons/contacts/networkIcon.svg"
                  alt="Facetime"
               />
               <p>Web-site</p>
            </a>
            <a href='mailto: ${email}' class="button button__email">
               <img
                  src="./icons/contacts/emailIcon.svg"
                  alt="Email"
               />
               <p>Email</p>
            </a>
            <div class="button button__delete">
               <img
                  src="./icons/contacts/deleteCompanyIcon.svg"
                  alt="Delete"
               />
               <p>Delete</p>
            </div>
         </div>
         <div class="form__activeCompany_info">
            <div class="info__block list">
               <h3>CEO: ${ceo}</h3>
               <div>Employees list</div>
               <ul class="emloyeesList">
               </ul>
            </div>
            <div class="info__block email">
               <div>
                  <h3 class="info__title">Address</h3>
                  <div class="email__address">${address}</div>
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
      <a href="#" class="mockup__homeIndicator"></a>`;
    const popup = document.createElement("div");
    const parent = document.querySelector(".mockup__contacts");
    popup.classList.add(
      "popup",
      "popup__form_activeCompany",
      "animate__animated"
    );

    popup.innerHTML = html;
    parent.append(popup);
    if (this.employeesList.length > 0) {
      // eslint-disable-next-line array-callback-return
      this.employeesList.map((human) => {
        const li = document.createElement("li");
        li.classList.add("singleEmployess");
        li.innerHTML = human;
        popup.querySelector(".emloyeesList").append(li);
      });
    }

    popup.style.display = "block";
    popup.classList.add("animate__fadeInDown");
    popup.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("form__activeCompany_closeBtn") ||
        e.target.classList.contains("mockup__homeIndicator")
      ) {
        popup.classList.remove("animate__fadeInDown");
        popup.classList.add("animate__fadeOutUp");
        setTimeout(() => {
          popup.remove();
        }, 500);
      } else if (e.target.classList.contains("button__delete")) {
        this.#deleteCompany(id);
        popup.classList.remove("animate__fadeInDown");
        popup.classList.add("animate__fadeOutUp");
        setTimeout(() => {
          popup.remove();
        }, 500);
      }
    });
  }

  #deleteCompany(id = this.#id) {
    document.querySelector(`[data-company-id="${id}"]`).remove();
    return httpService(
      `https://645636932e41ccf16916a499.mockapi.io/companies/${id}`,
      "DELETE"
    );
  }
}
export default Company;

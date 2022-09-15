let form = document.getElementById("form");

// localStorage.clear();
// let Entries = [];

const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const rows = entries
    .map((entry) => {
      const n_ame = `<td class="td">${entry.n_ame}</td>`;
      const e_mail = `<td class="td">${entry.e_mail}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const d_o_b = `<td class="td">${entry.d_o_b}</td>`;
      const accseptConditions = `<td class="td">${entry.accseptConditions}</td>`;

      const row = `<tr>${n_ame} ${e_mail} ${password} ${d_o_b} ${accseptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("tableDiv");

  // <th class="th">Name</th> inside oneMore head for name
  tableDiv.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">N_ame</th>
    <th class="th">E_mail</th>
    <th class="th">Password</th>
    <th class="th">D_o_b</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};

// const saveUserFrom = () => {
const saveUserFrom = (event) => {
  event.preventDefault();

  let n_ame = document.getElementById("n_ame").value;
  let e_mail = document.getElementById("e_mail").value;
  let password = document.getElementById("password").value;
  let d_o_b = document.getElementById("d_o_b").value;
  let accseptConditions = document.getElementById("agree").checked;

  let entry_obj = {
    n_ame,
    e_mail,
    password,
    d_o_b,
    accseptConditions,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

form.addEventListener("submit", saveUserFrom);

displayEntries();

// Add additional validations to the date input field so that it accepts date of birth for people between ages 18 and 55 only. You'll need to figure out how to do this.

function getAge(today, birthDate) {
  // var today = new Date();
  // var birthDate = new Date(DOB);

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let dateELE = document.getElementById("d_o_b");

dateELE.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("d_o_b").value.split("-");

  let d_o_b = new Date(year, month, date);
  let Today = new Date();

  age = getAge(Today, d_o_b);

  dateELE.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  if (age < 18 || age > 55) {
    dateELE.setCustomValidity("Your age is not lies between 18 and 55");
    dateELE.style.border = "2px solid red";
    return;
  } else {
    dateELE.setCustomValidity("");
  }
});

const e_mail = document.getElementById("e_mail");

e_mail.addEventListener("input", () => validate(e_mail));

function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}
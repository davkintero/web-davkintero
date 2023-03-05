/* =====================================
  ! DECLARACIÓN DE OBJETOS Y VARIABLES ¡
  ==================================== */
/* --- Boton y Menu Toogle --- */
let buttonToggle = document.getElementById("menu-toggle");
let boxMenu = document.getElementById("header-menu");

/* --- Validacion Formulario --- */
let formContact = document.getElementById('form');
let inputs = document.querySelectorAll('#form input');
let textArea = document.querySelectorAll('#form textarea');
let buttonForm = document.getElementById('item-btn');

let expreReg = {
	nameReg: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/, // Letras, espacios rn blanco, pueden llevar acentos.
  emailReg: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
  affairReg: /^.{1,255}$/,
  commentsReg: /^.{1,255}$/
};

let campos = {
  name: false,
  email:  false,
  affair: false,
  comments: false
};

/* ============================
  ! DECLARACIÓN DE FUNCIONES ¡
  =========================== */
/* --- Boton y Menu Toogle --- */
function changeClass() {
  boxMenu.classList.toggle("menu-open");
  buttonToggle.classList.toggle("toggle-open");
}

/* --- Validacion Formulario --- */
function validateInputs(e) {
  function validateCampoInput(expreReg, input, campo) {
    if (expreReg.test(input.value)) {
        document.getElementById(`group-${campo}`).classList.remove('validation-form-incorrect');
        document.getElementById(`group-${campo}`).classList.add('validation-form-correct');
        document.querySelector(`#group-${campo} i`).classList.add('zmdi-check-all');
        document.querySelector(`#group-${campo} i`).classList.remove('zmdi-close-circle');
        document.querySelector(`#group-${campo} .item-text-error`).classList.remove('item-text-error-activo');
        campos [campo] = true;
      } else {
        document.getElementById(`group-${campo}`).classList.add('validation-form-incorrect');
        document.getElementById(`group-${campo}`).classList.remove('validation-form-correct');
        document.querySelector(`#group-${campo} i`).classList.add('zmdi-close-circle');
        document.querySelector(`#group-${campo} i`).classList.remove('zmdi-check-all');
        document.querySelector(`#group-${campo} .item-text-error`).classList.add('item-text-error-activo');
        campos [campo] = false;
      }
  }
  switch (e.target.name) {
    case 'name':
      /*if (expreReg.nameReg.test(e.target.value)) {
        document.getElementById('group-name').classList.remove('validation-form-incorrect');
        document.getElementById('group-name').classList.add('validation-form-correct');
        document.querySelector('#group-name i').classList.add('zmdi-check-all');
        document.querySelector('#group-name i').classList.remove('zmdi-close-circle');
        document.querySelector('#group-name .item-text-error').classList.remove('item-text-error-activo');
      } else {
        document.getElementById('group-name').classList.add('validation-form-incorrect');
        document.getElementById('group-name').classList.remove('validation-form-correct');
        document.querySelector('#group-name i').classList.add('zmdi-close-circle');
        document.querySelector('#group-name i').classList.remove('zmdi-check-all');
        document.querySelector('#group-name .item-text-error').classList.add('item-text-error-activo');
      }*/
      validateCampoInput(expreReg.nameReg, e.target, 'name');
    break;

    case 'email':
      validateCampoInput(expreReg.emailReg, e.target, 'email');
    break;

    case 'affair':
      validateCampoInput(expreReg.affairReg, e.target, 'affair');
    break;
  }
}

function validateTextArea(e) {
  switch (e.target.name) {
    case 'comments':
      if (expreReg.commentsReg.test(e.target.value)) {
        document.getElementById('group-comments').classList.remove('validation-form-incorrect');
        document.getElementById('group-comments').classList.add('validation-form-correct');
        document.querySelector('#group-comments i').classList.add('zmdi-check-all');
        document.querySelector('#group-comments i').classList.remove('zmdi-close-circle');
        document.querySelector('#group-comments .item-text-error').classList.remove('item-text-error-activo');
        campos ['comments'] = true;
      } else {
        document.getElementById('group-comments').classList.add('validation-form-incorrect');
        document.getElementById('group-comments').classList.remove('validation-form-correct');
        document.querySelector('#group-comments i').classList.add('zmdi-close-circle');
        document.querySelector('#group-comments i').classList.remove('zmdi-check-all');
        document.querySelector('#group-comments .item-text-error').classList.add('item-text-error-activo');
        campos ['comments'] = false
      }
    break;
  }
}

function sendForm(e) {
  e.preventDefault();

  if (campos.name && campos.email && campos.affair && campos.comments) {
    formContact.reset();

    document.getElementById('item-msn-exito').classList.add('item-msn-exito-activo');
    setTimeout(() => {
      document.getElementById('item-msn-exito').classList.remove('item-msn-exito-activo');
    }, 3000);

    document.querySelectorAll('.validation-form-correct').forEach((icon) => {
      icon.classList.remove('validation-form-correct');
    });
  } else {
    document.getElementById('item-msn-error').classList.add('item-msn-error-activo');
     setTimeout(() => {
      document.getElementById('item-msn-error').classList.remove('item-msn-error-activo');
    }, 3000);
  }
}

/* ========================
  ! ASIGNACIÓN DE EVENTOS¡
  ======================= */
//ASIGNACIÓN DE EVENTOS
window.onload = function () {
  /* --- Boton y Menu Toogle --- */
  buttonToggle.addEventListener("click", changeClass);

  /* --- Validacion Formulario --- */
  formContact.addEventListener('submit', sendForm);

  inputs.forEach((input) => {
    input.addEventListener('keyup', validateInputs);
    input.addEventListener('blur', validateInputs);
  })

  textArea.forEach((textarea) => {
    textarea.addEventListener('keyup', validateTextArea);
    textarea.addEventListener('blur', validateTextArea);
  })
};

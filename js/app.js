document.addEventListener('DOMContentLoaded', function () {


  //Objeto
  const formLleno = {
    email: '',
    asunto: '',
    mensaje: ''
  }

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const loader = document.querySelector('#loader');

  //Asignar eventos
  const validar = e => {
    if (e.target.value.trim() === "") {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      formLleno[e.target.name] = '';
      comprobarFormLleno();
      return;
    }

    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta('El email no es válido', e.target.parentElement);
      formLleno[e.target.name] = '';
      comprobarFormLleno();
      return
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar los valores
    formLleno[e.target.name] = e.target.value.trim().toLowerCase();

    //Comprobar el objeto formLleno
    comprobarFormLleno();
  }

  const mostrarAlerta = (mensaje, referencia) => {
    limpiarAlerta(referencia);

    //Generar alerta HTML
    const error = document.createElement('P');
    error.textContent = mensaje;

    error.classList.add('bg-danger', 'p-2', 'rounded', 'text-white', 'text-center', 'mb-0', 'mt-2', 'alerta');

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  const limpiarAlerta = referencia => {
    //Comprueba si ya existe una alerta
    const alerta = referencia.querySelector('.alerta');
    if (alerta) {
      alerta.remove();
    }
  }

  const validarEmail = email => {
    //Expresion regular
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    const resultado = regex.test(email);

    return resultado;
  }

  const comprobarFormLleno = () => {
    if (Object.values(formLleno).includes('')) {
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.disabled = false;
  }

  function resetForm() {

    formLleno.email = '';
    formLleno.asunto = '';
    formLleno.mensaje = '';

    formulario.reset();
    comprobarFormLleno();
  }

  const enviarFormulario = e => {
    e.preventDefault();

    loader.classList.add('row');
    loader.classList.remove('visually-hidden');

    setTimeout(() => {
      loader.classList.remove('row');
      loader.classList.add('visually-hidden');

      resetForm();

      //Crear alerta
      const msgExito = document.createElement('P');
      msgExito.classList.add('bg-success', 'text-white', 'p-2', 'text-center', 'rounded', 'fw-bold')
      msgExito.textContent = 'Mensaje enviado correctamente';
      formulario.appendChild(msgExito);
      setTimeout(() => {
        msgExito.remove();
      }, 4000);
    }, 3000);
  }

  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);

  btnReset.addEventListener('click', function (e) {
    e.preventDefault();

    resetForm();
  })

  formulario.addEventListener('submit', enviarFormulario);


});
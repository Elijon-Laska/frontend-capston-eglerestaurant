const FormValidator = (props) => {
  const validate = (formValues = {}) => {
    const errors = {};

    // Validazioni comuni
    if (props.type === "login" || props.type === "registration") {
      // Email
      if (!formValues.email) {
        errors.email = "Email è richiesta";
      } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
        errors.email = "Email non valida";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email)) {
        errors.email = "Formato email non valido";
      }

      // Password
      if (!formValues.password) {
        errors.password = "Password è richiesta";
      } else if (formValues.password.length < 8) {
        errors.password = "Password deve essere almeno 8 caratteri";
      } else if (!/[a-z]/.test(formValues.password)) {
        errors.password = "Password deve contenere almeno una lettera minuscola";
      } else if (!/[A-Z]/.test(formValues.password)) {
        errors.password = "Password deve contenere almeno una lettera maiuscola";
      } else if (!/[0-9]/.test(formValues.password)) {
        errors.password = "Password deve contenere almeno un numero";
      } else if (!/[!@#$%^&*]/.test(formValues.password)) {
        errors.password = "Password deve contenere almeno un carattere speciale";
      }

      // Conferma password (per registrazione)
      if (props.type === "registration" && formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = "Le password non coincidono";
      }

      // Nome (per registrazione)
      if (props.type === "registration") {
        if (!formValues.nome) {
          errors.nome = "Nome è richiesto";
        } else if (!/^[a-zA-Z\s]+$/.test(formValues.nome)) {
          errors.nome = "Nome deve contenere solo lettere e spazi";
        } else if (formValues.nome.length < 2) {
          errors.nome = "Nome deve essere almeno 2 caratteri";
        }
      }
    }

    // Validazioni per prenotazione
    if (props.type === "prenotazione") {
      // Nome
      if (!formValues.nome) {
        errors.nome = "Nome è richiesto";
      } else if (!/^[a-zA-Z\s]+$/.test(formValues.nome)) {
        errors.nome = "Nome deve contenere solo lettere e spazi";
      } else if (formValues.nome.length < 2) {
        errors.nome = "Nome deve essere almeno 2 caratteri";
      }

      // Telefono
      if (!formValues.telefono) {
        errors.telefono = "Telefono è richiesto";
      } else if (!/^\+?[0-9\s-]+$/.test(formValues.telefono)) {
        errors.telefono = "Formato telefono non valido";
      } else if (formValues.telefono.length < 6 || formValues.telefono.length > 15) {
        errors.telefono = "Telefono deve avere almeno 6 cifre e al massimo 15 cifre";
      }

      // Email
      if (!formValues.email) {
        errors.email = "Email è richiesta";
      } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
        errors.email = "Email non valida";
      }

      // Numero di persone
      if (!formValues.persone || formValues.persone < 1 || formValues.persone > 20) {
        errors.persone = "Numero di persone deve essere tra 1 e 20";
      }

      // Data
      if (!formValues.data) {
        errors.data = "Data è richiesta";
      } else if (new Date(formValues.data) < new Date()) {
        errors.data = "Non è possibile prenotare per date passate";
      }

      // Ora
      if (!formValues.ora) {
        errors.ora = "Ora è richiesta";
      } else {
        const [hours] = formValues.ora.split(":");
        if (hours < 11 || hours > 23) {
          errors.ora = "Orario di prenotazione non valido (11:00-23:00)";
        }
      }

      // Richieste speciali
      if (formValues.richieste && formValues.richieste.length > 500) {
        errors.richieste = "Richieste speciali non possono superare i 500 caratteri";
      }
    }

    // Validazioni per recensioni
    if (props.type === "recensione") {
      // Rating
      if (!formValues.rating || formValues.rating < 1 || formValues.rating > 5) {
        errors.rating = "Valutazione deve essere tra 1 e 5 stelle";
      }

      // Commento
      if (!formValues.commento) {
        errors.commento = "Commento è richiesto";
      } else if (formValues.commento.length < 5) {
        errors.commento = "Commento deve essere almeno 5 caratteri";
      } else if (formValues.commento.length > 1000) {
        errors.commento = "Commento non può superare i 1000 caratteri";
      }
    }

    // Validazioni per contatti
    if (props.type === "contatti") {
      // Nome
      if (!formValues.nome) {
        errors.nome = "Nome è richiesto";
      } else if (!/^[a-zA-Z\s]+$/.test(formValues.nome)) {
        errors.nome = "Nome deve contenere solo lettere e spazi";
      }

      // Email
      if (!formValues.email) {
        errors.email = "Email è richiesta";
      } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
        errors.email = "Email non valida";
      }

      // Oggetto
      if (!formValues.oggetto) {
        errors.oggetto = "Oggetto è richiesto";
      } else if (formValues.oggetto.length < 5) {
        errors.oggetto = "Oggetto deve essere almeno 5 caratteri";
      }

      // Messaggio
      if (!formValues.messaggio) {
        errors.messaggio = "Messaggio è richiesto";
      } else if (formValues.messaggio.length < 10) {
        errors.messaggio = "Messaggio deve essere almeno 10 caratteri";
      } else if (formValues.messaggio.length > 2000) {
        errors.messaggio = "Messaggio non può superare i 2000 caratteri";
      }
    }

    return errors;
  };

  // Funzione per validare campi singolarmente
  const validateField = (fieldName, value, currentValues = {}) => {
    const tempErrors = validate({ ...currentValues, [fieldName]: value });

    return tempErrors[fieldName];
  };

  // Funzione per verificare se il form è valido
  const isFormValid = (values = {}) => {
    const tempErrors = validate(values);
    return Object.keys(tempErrors).length === 0;
  };

  return {
    validate,
    validateField,
    isFormValid,
  };
};

export default FormValidator;

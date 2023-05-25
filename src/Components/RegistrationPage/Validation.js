export default function Validation( values ) {
    let errors = {};
    const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const forbiddenSymbols = /[;'"]/;

    if(values.name === ""){
        errors.name = "Imię jest wymagane!";
    } else if (forbiddenSymbols.test(values.name)){
        errors.name = "Imię nie może zawierać symboli";
    }
    if(values.lastName === ""){
        errors.lastName = "Nazwisko jest wymagane!";
    } else if (forbiddenSymbols.test(values.lastName)){
        errors.lastName = "Nazwisko nie może zawierać symboli";
    }

    if(values.email === ""){
        errors.email = "Email jest wymagany!";
    } else if (!emailPattern.test(values.email)){
        errors.email = "Email nie jest poprawny";
    } else if (forbiddenSymbols.test(values.email)){
        errors.email = `Email nie może zawierać: ; ' "`;
    }

    if(values.password === ""){
        errors.password = "Hasło jest wymagane!"
    } else if (values.password.length < 8){
        errors.password = "Hasło powinno mieć co najmniej 8 znaków."
    } else if (forbiddenSymbols.test(values.password)){
        errors.password = `Hasło nie może zawierać: ; ' "`;
    }

    return errors;
}
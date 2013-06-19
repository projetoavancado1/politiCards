function validate_form_voter(){
	if(document.voter_registers._name.value=="") {
	     alert("O campo Nome deve ser preenchido");
	     return false;
	} else if(document.voter_registers.password.value=="") {
	     alert("O campo senha é obrigatório!");
	     return false;
	} else if(document.voter_registers.email.value=="") { 
	     alert("O campo email é obrigatório!");
	     return false;
	} else if(document.cvoter_registers.number.value=="") { 
	     alert("O campo idade é obrigatório!");
	     return false;
	} else if(document.voter_registers.password.value != document.voter_registers.password_confirm.value) {
	     alert("Confirmação da senha está incorreta!");
	     return false;
	} else
	 	return true;
}
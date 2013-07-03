<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<meta name="author" content="Raphael" />

	<title>Login do Usuário</title>
</head>

<script language="JavaScript" src="scripts.js"></script>

<body>
    <link rel="stylesheet" type="text/css" href="style.css" />

    <form name="login_usuario" action="valida_login.php" method="post" onsubmit="return validarCamposLoginUsuario(); return false;">
        <table>
            <tr>
                <td>Email: </td>
                <td><input type="text" id="email" name="email"/></td>
            </tr>
            <tr>
                <td>Senha: </td>
                <td><input type="password" id="password" name="password"/></td>
            </tr>
            <td colspan="2"><p>
               <input name="entrar" type="submit" id="entrar" value="Entrar" /> 
        

                <input name="limpar" type="reset" id="limpar" value="Limpar" /><br/><br/>

	        <p>  </p></td>
            </tr>
        </table>
    </form>
</body>
</html>

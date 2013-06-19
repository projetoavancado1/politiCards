<?php 

echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="author" content="digenaldo" />

    <title>Cadastro de Eleitor</title>
</head>

<script language="JavaScript" src="/javascripts/validate_forms.js/"></script>

<body>

    <form name="voter_registers" action="action.php" method="post" onsubmit="return validate_form_voter(); return false;">
        <table>
            <tr>
                <td>Nome: </td>
                <td><input type="text" id="_name" name="_name"/></td>
            </tr>
            <tr>
                <td>Email: </td>
                <td><input type="email" id="email" name="email"/></td>
            </tr>
            <tr>
                <td>Idade: </td>
                <td><input type="number" id="number" name="number"/></td>
            </tr>
            <tr>
                <td>Filiação Partidária?: </td>
                <td><select>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    </select></td>
            </tr>
            <tr>
                <td>Senha: </td>
                <td><input type="password" id="password" name="password"/></td>
            </tr>
            <tr>
                <td>Confirmar Senha: </td>
                <td><input type="password" id="password_confirm" name="password_confirm"/></td>
            </tr>
            <tr>
                <td colspan="2"><p>
                <input name="submit" type="submit" id="submit" value="Enviar" /> 
                <input name="reset" type="reset" id="reset" value="Limpar" /><br/><br/>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>'
?>
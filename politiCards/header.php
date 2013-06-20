<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet"  type="text/css" media="all" href="css/style.css">
<style type="text/css">
<!--
a:link {
	color: #000000;
}
a:visited {
	color: #000000;
}
a:hover {
	color: #66CCFF;
}
a:active {
	color: #000000;
}
-->
</style>
</head>
<script language="JavaScript" src="/javascripts/validate_forms.js/"></script>
<body>
<div id="topo">

  <table width="1000" height="87" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td width="394" align="left"><img src="img/PolitiCards.png" width="330" height="80" align="left" /></td>
      <td width="149" align="left"><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.politcards.com&amp;send=false&amp;layout=box_count&amp;width=50&amp;show_faces=false&amp;font=lucida+grande&amp;colorscheme=light&amp;action=like&amp;height=65" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:70px; height:65px;" allowTransparency="true"></iframe>&nbsp;</td>
      <td width="457" align="right"><table width="457" border="0" align="right" cellpadding="0" cellspacing="0">
        <tr>
          <td width="457" height="19"><strong>Acesse</strong> a sua conta: </td>
        </tr>
        <tr>
          <td height="19"><table width="453" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="203">Email:
                  <input type="text" name="textfield" id="textfield" class="inputLogin" /></td>
                <td width="200">Senha:
                  <input type="password" name="textfield2" id="textfield2" class="inputLogin" /></td>
                <td width="50"><br />
                    <input type="image" src="img/ok.fw.png"  />
                  &nbsp;</td>
              </tr>
          </table></td>
        </tr>
        <tr>
          <td height="19" align="right"><a href="resetar-senha.php">Esqueceu sua senha?</a></td>
        </tr>
      </table></td>
    </tr>
  </table>
</div>

<div id="conteudo">
<form name="voter_registers" action="valida_cadastro_usuario_json.php" method="post" onsubmit="return validate_form_voter(); return false;">
<table width="1080" height="525" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="508" align="left"><img src="img/charge-politica-humor1.jpg" width="621" height="449" /></td>
    <td width="492"><table width="425" height="153" border="0" align="right" cellpadding="0" cellspacing="0">
      <tr>
        <td height="65" align="center" background="img/bg-cfac.fw.png"><img src="img/entrarface.fw.png" width="169" height="36" /></td>
      </tr>
      <tr>
        <td height="44" align="center" bgcolor="#FFFFCC"><strong>Cadastre-se agora</strong> mesmo no PolitCards:</td>
      </tr>
      <tr>
        <td height="44" align="center" bgcolor="#FFFFCC"><table width="426" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="87" height="22">&nbsp;</td>
            <td width="339"><p>Nome Completo:
              <input type="text" name="nomecompleto" id="textfield3" class="inputCadastro" />
                </p>
              </td>
          </tr>
          <tr>
            <td height="22">&nbsp;</td>
            <td>Email:<br />
            <input type="text" name="email" id="textfield4" class="inputCadastro" /></td></tr>
          <tr>
            <td height="22">&nbsp;</td>
            <td>Confirmar Email:<br />
            <input type="text" name="confirmemail" id="textfield5" class="inputCadastro" /></td></tr>
          <tr>
            <td height="22">&nbsp;</td>
            <td>Senha:<br />
            <input type="text" name="senha" id="textfield6" class="inputCadastro" /></td></tr>
          <tr>
            <td height="22">&nbsp;</td>
            <td>Nascimento:<br />
            <input type="text" name="senha" id="textfield7" class="inputCadastro" /></td></tr>
          <tr>
            <td height="21">&nbsp;</td>
            <td>Eu sou:<br />
            <input type="checkbox" name="checkbox" id="checkbox" />
              Eleitor 
              <input type="checkbox" name="checkbox2" id="checkbox2" />
              Político</td></tr>
          <tr>
            <td height="34">&nbsp;</td>
            <td>Sexo:<br />
            <select name="select" id="select">
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outro</option>
            </select>            </td></tr>
          <tr>
            <td height="34">&nbsp;</td>
            <td><br />
	      <input name="submit" src="img/entrar-bt.fw.png" type="image" id="submit" value="Enviar" /> 
              <!<img src="img/entrar-bt.fw.png" input name="submit" type="submit" id="submit" /></td>
          </tr>
        </table></td>
      </tr>
    </table></td>

  </tr>
</table><br /><br /><br /></div>
</form>
<div id="rodape">
ssss
</div>
</body>
</html>

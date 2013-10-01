-- MySQL dump 10.13  Distrib 5.5.15, for osx10.6 (i386)
--
-- Host: localhost    Database: cellar
-- ------------------------------------------------------
-- Server version	5.5.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for tables
--

INSERT INTO `posts`(`author`,`title`,`text`)
VALUES
	('1','Protestos em Brasilia','Protestos em Brasilia'),
	('1','Protestos em Sao Paulo','Protestos em Sao Paulo'),
	('2','Protestos em Minas','Protestos em Minas'),
	('3','Protestos em Alagoas','Protestos em Alagoas'),
	('1','Protestos em Brasilia2','Protestos em Brasilia2'),
	('1','Protestos em Sao Paulo2','Protestos em Sao Paulo2'),
	('2','Protestos em Minas2','Protestos em Minas2'),
	('3','Protestos em Alagoas2','Protestos em Alagoas2'),
	('1','Protestos em Brasilia3','Protestos em Brasilia3'),
	('1','Protestos em Sao Paulo3','Protestos em Sao Paulo3'),
	('2','Protestos em Minas3','Protestos em Minas3'),
	('3','Protestos em Alagoas3','Protestos em Alagoas3'),
	('1','Former Rep. Lindy Boggs of Louisiana dies at 97','Boggs, who later served three years as ambassador to the Vatican during the Clinton administration, died of natural causes at her home in Chevy Chase, Md., according to her daughter, ABC News journalist Cokie Roberts. When Boggs announced her retirement in 1990, she was the only white representing a black-majority district in Congress. "I am proud to have played a small role in opening doors for blacks and women," she said at the time. As family tragedy brought her in to Congress, so did it usher her out. At the time of her July 1990 announcement, her daughter Barbara Boggs Sigmund, mayor of Princeton, N.J., was dying of cancer. Sigmund died that October.'),
	('2','Obama is day: Vietnam and Florida','President Obama has a long and busy day Thursday, touching on both foreign and domestic policy. In the morning, Obama meets with President Truong Tan Sang of Vietnam to discuss "how to further strengthen our partnership on regional strategic issues and enhance our cooperation" with nations in Southeast Asia, says the White House schedule. The leaders also plan to discuss human rights and climate change, the White House says. Later in the morning, Obama travels to Florida for the latest in his series of speeches on the economy and middle class, a revived effort that began Wednesday with remarks in Illinois and Missouri. Obama will tour the Jacksonville Port Authority and then deliver his speech to "lay out his vision for rebuilding an economy that puts the middle class and those fighting to join it front and center. "His emphasis Thursday will be on plans to rebuild roads, bridges, and other infrastructure. The president returns Thursday evening to the White House, where he will host an Iftar dinner to celebrate Ramadan.'),
	('3','Mayor, who has rejected calls to resign over sexual harassment claims, says he wants to put himself in a position to be forgiven.','San Diego Mayor Bob Filner said Friday he will undergo "intensive therapy" amid growing calls that he resign because of sexual harassment charges from several women, including a former staffer. "I apologize to my staff. I apologize to the citizens and staff members who have supported me over the years. I apologize to the people of San Diego. And, most of all, I apologize to the women I have offended," the mayor said. "The behavior I have engaged in over many years is wrong. My failure to respect women and the intimidating conduct I engaged in at times is inexcusable. It has undermined what I spent my whole professional life doing: fighting for equality and justice for all people." Seven women have come forward accusing Filner of what has been described as "truly reprehensible" behavior including groping and sexually charged remarks. He is a former member of Congress and the first Democrat in 20 years to be elected mayor of San Diego, the second-most populous city in California.'),
	('4','Bem vindo ao PolitiCards','O Politicards e uma rede social que possui como objetivo reunir e disponibilizar informacoes sobre politicos e eleitores e promover a difusao de ...');

INSERT INTO `comments`(`author`,`post`,`text`)
VALUES
	('3','1','Protestos em Brasilia'),
	('3','1','Protestos em Sao Paulo'),
	('4','2','Protestos em Minas'),
	('6','3','Protestos em Alagoas'),
	('8','16','Muito bom pessoal! Esse trabalho merece 10!'),
	('6','15','firs comment'),
	('5','15','second comment'),
	('4','15','"Mayor, who has rejected calls to resign over sexual harassment claims"');

INSERT INTO `user`(`name`,`email`,`gender`,`birthday`,`passWord`,`profilePicture`,`userType`) 
VALUES 
	('Digenaldo Neto','digenaldo.neto@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/digenaldo.jpg', '1'),
	('Raphael Diniz','raphael.diniz@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/raphael.jpg', '1'),
	('Joao Helis Bernardo','joaohelis.bernardo@dce.ufpb.br','Masculino', '1993-07-27', '123', '../img/profilePictures/joaohelis.jpg', '1'),
	('Kelson Victor','kelson.victor@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/kelson.jpg', '1'),
	('Pablo Lima','pablo.lima@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/pablo.jpg', '1'),
	('Juan Duarte','juan.duarte@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/juan.jpg', '1'),
	('Smith Ascari','smith.ascari@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/smith.jpg', '1'),
	('Yuri Malheiros','yuri@dce.ufpb.br','Masculino', '1970-01-01', '123', '../img/profilePictures/yuri.jpg', '1'),
	('Amy Jones','amy.jones@gmail.com','Feminino', '1970-01-01', '123', '../img/profilePictures/Amy_Jones.jpg', '1'),
	('Julie Taylor','julie.taylor@gmail.com','Feminino', '1970-01-01', '123', '../img/profilePictures/Julie_Taylor.jpg', '1'),
	('Kathleen Byrne','kathleen.byrne@gmail.com','Feminino', '1970-01-01', '123', '../img/profilePictures/Kathleen_Byrne.jpg', '1'),
	('Lisa Wong','lisa.wong@gmail.com','Feminino', '1970-01-01', '123', '../img/profilePictures/Lisa_Wong.jpg', '1'),
	('Paula Gates','paula.gates@gmail.com','Feminino', '1970-01-01', '123', '../img/profilePictures/Paula_Gates.jpg', '1'),
	('Eugene Lee','eugene.lee@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/Eugene_Lee.jpg', '1'),
	('Gary Donovan','gary.donovan@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/Gary_Donovan.jpg', '1'),
	('James King','james.king@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/James_King.jpg', '1'),
	('John Williams','john.williams@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/John_Williams.jpg', '1'),
	('Paul Jones','paul.jones@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/Paul_Jones.jpg', '1'),
	('Ray Moore','ray.moore@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/Ray_Moore.jpg', '1'),
	('Steven Wells','steven.wells@gmail.com','Masculino', '1970-01-01', '123', '../img/profilePictures/Steven_Wells.jpg', '1');
	


INSERT INTO `message`(`sender`,`receiver`,`text`,`title`,`wasRead`)
VALUES 			
	('1','2','Em reuniao nesta terca-feira (24), a CPI (Comissao Parlamentar de Inquerito) da Espionagem no Senado aprovou a realizacao de uma serie de audiencias publicas. Entre os convidados a serem ouvidos pelos senadores em reunioes com datas ainda a serem marcadas estao representantes de companhias telefonicas, como Telefonica, GVT, Oi e TIM, e gigantes da internet como Google, Facebook e Microsoft.',
	 'CPI da Espionagem vai convidar Google, Facebook e empresas de telefonia',false),	
	('3','5','O ministro da Justica, Jose Eduardo Cardozo, defendeu nesta terca-feira (24) o aprimoramento das leis brasileiras, a fim de defender a privacidade dos cidadaos e tambem do Estado brasileiro. Mais cedo, a presidente Dilma Rousseff havia defendido a regulacao da internet em seu discurso na abertura da 68a Assembleia Geral da ONU (Organizacao das Nacoes Unidas).',
	 'Ministro segue Dilma e defende Marco Civil da Internet em resposta a espionagem',false),
	('3','6','O presidente da Camara, Henrique Eduardo Alves (PMDB-RN), disse nesta terca-feira (24) que pretende colocar em votacao hoje, na sessao ordinaria do plenario, os tres projetos de lei com urgencia constitucional que trancam a pauta. Sao eles: PL 3471/12, que anistia as dividas das Santas Casas de Misericordia; PL 5740/13, que cria a Agencia Nacional de Assistencia Tecnica e Extensao Rural (Anater); e PL 6053/13, que cria funcoes comissionadas para o Departamento Nacional de Infraestrutura de Transportes (Dnit).',
	 'Alves pretende por em votacao hoje tres projetos que trancam a pauta da Camara',false),
	('4','3','O deputado Candido Vaccarezza (PT-SP) vai defender na reuniao de lideres logo mais que seja votada a proposta de minirreforma eleitoral aprovada no Senado, para vigorar para as proximas eleicoes.',
	 'Vaccarezza critica posicao do PT contra minirreforma eleitoral, mas segue partido',false),
	('4','2','A deputada federal Luiza Erundina (PSB-SP) afirmou nesta segunda-feira (23) que a ruptura de seu partido com a base do governo da presidente Dilma Rousseff (PT) foi uma "medida necessaria e natural", uma vez que a legenda lancara, na eleicao de 2014, a candidatura de Eduardo Campos, atual governador de Pernambuco, a Presidencia da Republica.','Erundina diz que PSB tem "projeto de nacao" para enfrentar Dilma em 2014',false),
	('3','7','Com dificuldades para conseguir a tempo sua aprovacao na Justica Eleitoral, o partido da ex-senadora Marina Silva decidiu flexibilizar as regras de filiacao como forma de facilitar o ingresso de candidatos as eleicoes de 2014.','Rede flexibiliza as adesoes, mas quer barrar ruralistas',false),
	('2','5','Os ex-presidentes da Republica Luiz Inacio Lula da Silva e Fernando Henrique Cardoso assumiram pessoalmente a busca por nomes de candidatos a vice-governador de seus partidarios, respectivamente Alexandre Padilha e o governador Geraldo Alckmin, na eleicao paulista de 2014','Lula e FHC garimpam no agronegocio vices para afilhados',false),
	('7','1','Chefes de dois cartorios eleitorais da Grande Sao Paulo acusam o Solidariedade, novo partido organizado pelo deputado Paulo Pereira da Silva (PDT-SP), de falsificar suas assinaturas para engordar as listas de apoio apresentadas pela sigla a Justica Eleitoral.','Fraude para criar partido usa ate nome de chefe de cartorio',false),
	('7','10','No dia seguinte a tomar posse, o novo procurador-geral da Republica, Rodrigo Janot, garantiu a seus colegas de carreira o direito de viajar em classe executiva, espaco com mais conforto aos passageiros nas aeronaves. A medida foi publicada no Diario Oficial da Uniao na semana passada e diferencia os procuradores dos demais servidores do orgao. Na maioria dos casos, os funcionarios comuns terao direito a viajar de classe economica, enquanto que os procuradores, de executiva.','Janot garante a procuradores viagem em classe executiva',false),
	('2','1', 'Testando a funcionalidade de mensagem!', 'Teste 1', false),
	('3','1', 'Testando a funcionalidade de mensagem!', 'Teste 2', false),
	('5','1', 'Testando a funcionalidade de mensagem!', 'Teste 3', false),
	('7','1', 'Testando a funcionalidade de mensagem!', 'Teste 4', false),
	('6','1', 'Testando a funcionalidade de mensagem!', 'Teste 5', false),
	('2','3', 'Testando a funcionalidade de mensagem!', 'Teste 6', false),
	('3','3', 'Testando a funcionalidade de mensagem!', 'Teste 7', false),
	('5','3', 'Testando a funcionalidade de mensagem!', 'Teste 8', false),
	('7','3', 'Testando a funcionalidade de mensagem!', 'Teste 9', false),
	('6','3', 'Testando a funcionalidade de mensagem!', 'Teste 10', false),
	('2','4', 'Testando a funcionalidade de mensagem!', 'Teste 11', false),
	('3','4', 'Testando a funcionalidade de mensagem!', 'Teste 12', false),
	('5','4', 'Testando a funcionalidade de mensagem!', 'Teste 13', false),
	('7','4', 'Testando a funcionalidade de mensagem!', 'Teste 14', false),
	('6','4', 'Testando a funcionalidade de mensagem!', 'Teste 15', false),
	('1','4', 'Testando a funcionalidade de mensagem!', 'Teste 16', false),	
	('4','3', 'Testando a funcionalidade de mensagem!', 'Teste 17', false),
	('8','3', 'Testando a funcionalidade de mensagem!', 'Teste 18', false),
	('9','3', 'Testando a funcionalidade de mensagem!', 'Teste 19', false),
	('10','3', 'Testando a funcionalidade de mensagem!', 'Teste 20', false),
	('1','3', 'Testando a funcionalidade de mensagem!', 'Teste 21', false);
	
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


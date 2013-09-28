politiCards
===========


## Database Setup: ##

If you have Python installed:
	- Enter in the directory 'db_configuration'
	- Execute configDB.py (python configDB.py)

else:

	1. Create a MySQL database with name "politiCards" (CREATE DATABASE `politiCards` CHARACTER SET UTF8;)
	2. Enter in the directory 'db_configuration'
	3. Execute createTables.sql to create the tables:

		mysql politiCards -u [your_user] -p < createTables.sql

	4.  Execute insertsOfTables.sql to populate the tables:

		mysql politiCards -u [your_user] -p < insertsTables.sql

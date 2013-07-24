politiCards
===========


## Database Set Up: ##

1. Create a MySQL database name "politiCards".
2. Enter in the directory. 
3. Execute createTables.sql to create the tables:

	mysql politiCards -u dev -p < createTables.sql

4.  Execute insertsOfTables.sql to populate the tables:

	mysql politiCards -u dev -p < insertsTables.sql

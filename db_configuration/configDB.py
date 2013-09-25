import os
create_db = "mysql -u dev -ppas20122 < createDB.sql"
create_tables = "mysql politiCards -u dev -ppas20122 < createTables.sql"
insert_tables = "mysql politiCards -u dev -ppas20122 < insertsTables.sql"
os.system(create_db)
os.system(create_tables)
os.system(insert_tables)

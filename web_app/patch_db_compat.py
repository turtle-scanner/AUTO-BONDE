import sqlite3
c = sqlite3.connect('trading_platform.db')
c.execute("UPDATE users SET email='cntfed' WHERE username='cntfed'")
c.execute("UPDATE users SET email='admin' WHERE username='admin'")
c.commit()
c.close()
print("DB compatibility patch done.")

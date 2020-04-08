import pymysql
def coneccion():
    conn = pymysql.connect(
        db='base_lgem',
        user='root',
        passwd='ruben',
        host='localhost')
    c = conn.cursor()
    return c,conn
# -*- coding: utf8 -*-

import sqlite3


def get_conn():
    return sqlite3.connect("topic.db")


class User(object):
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def save(self):
        sql = "insert into user VALUES (?,?)"  # sql语句
        conn = get_conn()  # 连接数据库
        cursor = conn.cursor()  # 定义一个游标
        cursor.execute(sql, (self.id, self.name))  # 执行sql语句
        conn.commit()  # 提交数据库改动
        cursor.close()  # 关闭游标
        conn.close()  # 关闭数据库连接

    '''
    staticmethod相当于一个定义在类里面的函数，所以如果一个方法既不跟实例
    相关也不跟特定的类相关，推荐将其定义为一个staticmethod，这样不仅使代
    码一目了然，而且似的利于维护代码。
    '''

    @staticmethod
    def query():
        sql = "select * from user"
        conn = get_conn()
        cursor = conn.cursor()
        rows = cursor.execute(sql)
        users = []
        for row in rows:
            user = User(row[0], row[1])
            users.append(user)
        conn.commit()
        cursor.close()
        conn.close()
        return users


class db(object):
    def __init__(self):
        self.con = sqlite3.connect('topic.db')
        self.cur = self.con.cursor()
        # create_table()
        self.cur.execute("CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY NOT NULL, \
                                   hash varchar )")

    def dbexec(self, sql):
        # print(sql)
        # sql = "INSERT INTO images(hash)  VALUES('xxx')"
        self.cur.execute(sql)
        self.con.commit()

    def search(self, limit, offset):
        rows = self.cur.execute('select hash from images limit {}  offset {} order by id desc'.format(limit, offset))
        list_hash = ''
        for row in rows:
            list_hash += row[0] + ','
        return list_hash


if __name__ == '__main__':
    db().search(3, 3)

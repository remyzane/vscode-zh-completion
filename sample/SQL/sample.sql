-- SQL 中文命名样例

CREATE TABLE 学生表 ( id INTEGER, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT );

INSERT INTO 学生表 (id, 姓名, 年龄, 班级) VALUES (2, '小明', 17, '高二(1)班');

SELECT id, 姓名, 年龄, 班级 FROM 学生表 WHERE 年龄 > 16 AND 班级 LIKE '高二%';

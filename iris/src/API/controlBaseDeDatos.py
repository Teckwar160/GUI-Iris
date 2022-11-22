import sqlite3 as sql
import pandas as pd


def crearBase():
    baseIris = sql.connect("iris.db")

    baseIris.commit()
    baseIris.close()


def crearTabla():
    baseIris = sql.connect("iris.db")

    cursor = baseIris.cursor()

    cursor.execute(
        """
            CREATE TABLE Proyectos(
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre VARCHAR(100),
                Datos VARCHAR(300),
                Descripción VARCHAR(200)
            )
        """
    )

    baseIris.commit()
    baseIris.close()


def insertarFila(nombre, datos, descripcion):
    baseIris = sql.connect("iris.db")

    cursor = baseIris.cursor()

    instruccion = f"INSERT INTO Proyectos(Nombre, Datos, Descripción) VALUES('{nombre}','{datos}','{descripcion}')"

    cursor.execute(instruccion)

    baseIris.commit()
    baseIris.close()

def leerFilas():
    baseIris = sql.connect("iris.db")

    cursor = baseIris.cursor()

    instruccion = f"SELECT * FROM Proyectos"

    cursor.execute(instruccion)

    datos = cursor.fetchall()

    baseIris.commit()
    baseIris.close()
    
    return datos

def actualizarNombre(Id,Nombre):
    baseIris = sql.connect("iris.db")

    cursor = baseIris.cursor()

    instruccion = f"UPDATE Proyectos SET Nombre='{Nombre}' WHERE Id={Id}"

    cursor.execute(instruccion)

    baseIris.commit()
    baseIris.close()

def actualizarDescripcion(Id,Descripcion):
    baseIris = sql.connect("iris.db")

    cursor = baseIris.cursor()

    instruccion = f"UPDATE Proyectos SET Descripción='{Descripcion}' WHERE Id={Id}"

    cursor.execute(instruccion)

    baseIris.commit()
    baseIris.close()

def eliminarFila(Id):
    baseIris = sql.connect("iris.db")

    cursor = baseIris.cursor()

    instruccion = f"DELETE FROM Proyectos WHERE Id={Id}"

    cursor.execute(instruccion)

    baseIris.commit()
    baseIris.close()

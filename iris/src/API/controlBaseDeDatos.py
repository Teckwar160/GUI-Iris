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


if __name__ == "__main__":
    #crearBase()
    #crearTabla()
    insertarFila("Proyecto2","http:www.google.com","Es un proyecto de prueba")
    


# IMPORTAMOS LAS LIBRERÍAS
from flask import Flask
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)


# RUTA PRINCIPAL
@app.route("/")
def HolaFlask():
    return "<h1>¡Hola Flask!</h1><hr>"


# 1. PROMEDIO DE NOTAS
@app.route("/notas")
@app.route("/notas/<float:nota1>/<float:nota2>/<float:nota3>")
def notas(nota1=0, nota2=0, nota3=0):

    resultado = (nota1 * 30)/100 + (nota2 * 30)/100 + (nota3 * 40)/100

    return f"<h1>El resultado es: {resultado}</h1><hr>"


# 2. CLASIFICAR EDADES
@app.route("/edades")
@app.route("/edades/<int:edad>")
def edades(edad=0):

    if edad < 18:
        R = "Menor de edad"

    elif edad < 60:
        R = "Adulto"

    else:
        R = "Adulto mayor"

    return f"<h1>La persona es: {R}</h1><hr>"


# 3. ARREGLOS ALEATORIOS
@app.route("/arreglos")
@app.route("/arreglos/<int:valores>/<int:columnas>")
@app.route("/arreglos/<int:valores>/<int:columnas>/<int:filas>")
def arreglos(valores=0, columnas=0, filas=0):

    if valores <= 0 or columnas <= 0 or filas < 0:
        return "<h1>Ingrese valores positivos válidos</h1>"

    if filas == 0:
        arreglo = np.random.randint(valores, size=columnas)

    else:
        arreglo = np.random.randint(valores, size=(filas, columnas))

    return f"<h1>El arreglo aleatorio es: {arreglo}</h1><hr>"


# 4. CALCULAR ECUACIÓN
# Y = X * Z + Z + X
@app.route("/ecuacion")
@app.route("/ecuacion/<float:x>/<float:z>")
def ecuacion(x=0, z=0):

    resultado = x * z + z + x

    return f"""
    <h1>Calcular ecuación</h1>
    <h2>X = {x}</h2>
    <h2>Z = {z}</h2>
    <h2>El resultado de Y es: {resultado}</h2>
    <hr>
    """


# 5. TABLA DE MULTIPLICAR
@app.route("/tabla")
@app.route("/tabla/<int:numero>")
def tabla(numero=0):

    resultado = "<h1>Tabla de multiplicar</h1>"

    for i in range(1, 11):
        resultado += f"<h3>{numero} x {i} = {numero * i}</h3>"

    return resultado + "<hr>"


# 6. CALCULAR ÁREAS
@app.route("/areas")
@app.route("/areas/circulo/<float:radio>")
@app.route("/areas/cuadrado/<float:lado>")
@app.route("/areas/triangulo/<float:base>/<float:altura>")
def areas(radio=None, lado=None, base=None, altura=None):

    if radio is not None:

        if radio <= 0:
            return "<h1>El radio debe ser positivo</h1>"

        resultado = 3.1416 * radio ** 2
        figura = "Círculo"

    elif lado is not None:

        if lado <= 0:
            return "<h1>El lado debe ser positivo</h1>"

        resultado = lado ** 2
        figura = "Cuadrado"

    elif base is not None and altura is not None:

        if base <= 0 or altura <= 0:
            return "<h1>Las medidas deben ser positivas</h1>"

        resultado = (base * altura) / 2
        figura = "Triángulo"

    else:
        return "<h1>Seleccione una figura y sus medidas</h1>"

    return f"""
    <h1>Área del {figura}</h1>
    <h2>El resultado es: {resultado}</h2>
    <hr>
    """


# EJECUTAR SERVIDOR
if __name__ == '__main__':

    # El valor True activa el modo debug
    app.run(debug=True)

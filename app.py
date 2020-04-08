from flask import Flask, render_template,json, request,Markup
import json
from cnx import coneccion
from mned import *
from adaboost import *
import plotly.tools as tls
from plotly.offline import *
from plotly.graph_objs import *

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')


@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/esta')
def esta():
    return render_template('esta.html')

@app.route('/imc')
def imc():
    return render_template('imc.html')


@app.route('/soft')
def soft():
    return render_template('soft.html')

@app.route('/resultado')
def resultado():
    return render_template('resultado.html')
    

#Con esta nueva funcion vamos a graficar un pie-chart utilizando plotly..

@app.route('/grafica',methods=['POST'])
def grafica():

    c,con=coneccion()
    _op=request.form['op']
    
    if _op=="mostrar_pie":
        try:
            c.execute("SELECT COUNT(*) AS DIABETICOS FROM base_datos WHERE FLAT_CLAS=1 AND GRUPO=-1")
            fd = c.fetchall()
            c.execute("SELECT COUNT(*) AS NO_DIABETICOS FROM base_datos WHERE FLAT_CLAS=1 AND GRUPO=1")
            fnd = c.fetchall()
        except:
            print "No se pudo completar la consulta"
        d=fd[0][0]
        nd=fnd[0][0]    
        labels = ['DIABETICS','NON-DIABETICS']
        values = [d,nd]
        trace = Pie(labels=labels, values=values)
        my_plot_div=plot([trace],output_type='div')
        grafica=str(my_plot_div)
        return json.dumps(grafica)

#Con esta nueva funcion vamos procesar los datos..

@app.route('/proceso',methods=['POST'])
def proceso():
    c,con=coneccion()
    _op=request.form['op']

    if _op=="agregar":
        _gender=request.form['gender']
        _year=float(request.form['year'])
        _PAS=float(request.form['PAS'])
        _PAD=float(request.form['PAD'])
        _CA=float(request.form['CA'])
        _BMI=float(request.form['BMI'])
        _HbAc1=float(request.form['HbAc1'])
        _Cholesterol=float(request.form['Cholesterol'])
        _TGL=float(request.form['TGL'])
        _HDL=float(request.form['HDL'])
        _LDL=float(request.form['LDL'])
        _VLDL=float(request.form['VLDL'])
        _SPN1=request.form['SPN1']
        _SPN2=request.form['SPN2']
        _SPN3=request.form['SPN3']
        _SPN4=request.form['SPN4']
        _SPN5=request.form['SPN5']
        _SPN6=request.form['SPN6']
        _SPN7=request.form['SPN7']
        _SPN8=request.form['SPN8']   
        if _year:
            try:
                c.execute("INSERT INTO base_datos (EDAD,GENERO,PAS,PAD,CA,BMI,HbAc1,COLES,TGL,HDL,LDL,VLDL,SNP1,SNP2,SNP3,SNP4,SNP5,SNP6,SNP7,SNP8) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(_year,_gender,_PAS,_PAD,_CA,_BMI,_HbAc1,_Cholesterol,_TGL,_HDL,_LDL,_VLDL,_SPN1,_SPN2,_SPN3,_SPN4,_SPN5,_SPN6,_SPN7,_SPN8))
                con.commit()
                return "Bien echo"
            except:
                con.rollback()
                
    elif _op=="actualizar":
        _ID_IND=request.form['ID_IND']  
        _gender=request.form['gender']
        _year=float(request.form['year'])
        _PAS=float(request.form['PAS'])
        _PAD=float(request.form['PAD'])
        _CA=float(request.form['CA'])
        _BMI=float(request.form['BMI'])
        _HbAc1=float(request.form['HbAc1'])
        _Cholesterol=float(request.form['Cholesterol'])
        _TGL=float(request.form['TGL'])
        _HDL=float(request.form['HDL'])
        _LDL=float(request.form['LDL'])
        _VLDL=float(request.form['VLDL'])
        _SPN1=request.form['SPN1']
        _SPN2=request.form['SPN2']
        _SPN3=request.form['SPN3']
        _SPN4=request.form['SPN4']
        _SPN5=request.form['SPN5']
        _SPN6=request.form['SPN6']
        _SPN7=request.form['SPN7']
        _SPN8=request.form['SPN8']   
        if _year:
            try:
                nuevaCons=""" UPDATE base_datos
                SET GENERO=%s,EDAD=%s,PAS=%s,PAD=%s,CA=%s,BMI=%s,HbAc1=%s,COLES=%s,TGL=%s,
                HDL=%s,LDL=%s,VLDL=%s,SNP1=%s,SNP2=%s,SNP3=%s,SNP4=%s,SNP5=%s,SNP6=%s,SNP7=%s,SNP8=%s
                WHERE ID_IND = %s """
                data=(_gender,_year,_PAS,_PAD,_CA,_BMI,_HbAc1,_Cholesterol,_TGL,_HDL,_LDL,_VLDL,_SPN1,_SPN2,_SPN3,_SPN4,_SPN5,_SPN6,_SPN7,_SPN8,_ID_IND)
                #EJECUTAMOS DE NUEVO LA CLASIFICACION#
                c.execute(nuevaCons,data)
                con.commit()

                #Selecciona toda la data bruta
                c.execute("SELECT * FROM base_datos ORDER BY ID_IND ASC LIMIT 267")
                lista_objectos=[]
                filas = c.fetchall()
                for fila in filas:
                    t=[fila[0],fila[1],fila[2],fila[3],fila[4],fila[5],fila[6],fila[7],fila[8],fila[9],fila[10],fila[11],fila[12],
                    fila[13],fila[14],fila[15],fila[16],fila[17],fila[18],fila[19],fila[20],fila[21]]
                #Guarda toda la data en un arreglo
                    lista_objectos.append(t)
                #Selecciona el elemento que queramos para la actualizacion
                c.execute("SELECT * FROM base_datos WHERE ID_IND="+str(_ID_IND)+"")
                filas_n = c.fetchall()
                t_n=[filas_n[0][0],filas_n[0][1],filas_n[0][2],filas_n[0][3],filas_n[0][4],filas_n[0][5],filas_n[0][6],filas_n[0][7],
                filas_n[0][8],filas_n[0][9],filas_n[0][10],filas_n[0][11],filas_n[0][12],filas_n[0][13],filas_n[0][14],filas_n[0][15],
                filas_n[0][16],filas_n[0][17],filas_n[0][18],filas_n[0][19],filas_n[0][20],filas_n[0][21]]
                #Junta el ultimo elemento con la la base de datos seleccionada=267
                lista_objectos.append(t_n)

                #Sepaara la data en Caracteristicas,Etiquetas y el id
                datMat,etiquetaMat,idMat=SeparandoData(lista_objectos)
                #Normaliza datos numericos en la data real
                normalArreglo(datMat,1)
                normalArreglo(datMat,2)
                normalArreglo(datMat,3)
                normalArreglo(datMat,4)
                normalArreglo(datMat,5)
                normalArreglo(datMat,6)
                normalArreglo(datMat,7)
                normalArreglo(datMat,8)
                normalArreglo(datMat,9)
                normalArreglo(datMat,10)
                normalArreglo(datMat,11)

                tm=len(datMat) #aumentando la base de datos..

                #tm=267 #Solo para entrenar con la data dada
                arregloClas=datMat[-1]
                idClas=idMat[-1]
                arregloEntrenar=datMat[0:tm-1]
                etiquetaMat=etiquetaMat[0:tm-1]
                arregloClasificador=adaBootTrainDS(arregloEntrenar,etiquetaMat,10)
                predictor=adaClassify(arregloClas,arregloClasificador)
                r=predictor.item(0)
                type(r)
                # ESTO YA NO POR QUE YA ESTA CLASIFICADO FLAT_CLAS=1
                #print predictor
                nuevaCons=""" UPDATE base_datos
                    SET GRUPO = %s
                    WHERE ID_IND = %s """

                data = (r,idClas)
                
                c.execute(nuevaCons,data)
                con.commit()
                return "Bien echo"
                #------------------------------------#
            except:
                con.rollback()
    elif _op=="procesar":
        try:
            #Selecciona toda la data bruta
            c.execute("SELECT * FROM base_datos ORDER BY ID_IND ASC LIMIT 267")
            con.commit()
            lista_objectos=[]
            filas = c.fetchall()
            for fila in filas:
                t=[fila[0],fila[1],fila[2],fila[3],fila[4],fila[5],fila[6],fila[7],fila[8],fila[9],fila[10],fila[11],fila[12],
                fila[13],fila[14],fila[15],fila[16],fila[17],fila[18],fila[19],fila[20],fila[21]]
            #Guarda toda la data en un arreglo
                lista_objectos.append(t)
            #print lista_objectos

            #Selecciona el ultimo elemento ingresado en la base de datos
            c.execute("SELECT * FROM base_datos ORDER BY ID_IND DESC LIMIT 1")
            con.commit()
            filas_n = c.fetchall()
            t_n=[filas_n[0][0],filas_n[0][1],filas_n[0][2],filas_n[0][3],filas_n[0][4],filas_n[0][5],filas_n[0][6],filas_n[0][7],
            filas_n[0][8],filas_n[0][9],filas_n[0][10],filas_n[0][11],filas_n[0][12],filas_n[0][13],filas_n[0][14],filas_n[0][15],
            filas_n[0][16],filas_n[0][17],filas_n[0][18],filas_n[0][19],filas_n[0][20],filas_n[0][21]]
            #Junta el ultimo elemento con la la base de datos seleccionada=267
            lista_objectos.append(t_n)

            #Sepaara la data en Caracteristicas,Etiquetas y el id
            datMat,etiquetaMat,idMat=SeparandoData(lista_objectos)
            #Normaliza datos numericos en la data real
            normalArreglo(datMat,1)
            normalArreglo(datMat,2)
            normalArreglo(datMat,3)
            normalArreglo(datMat,4)
            normalArreglo(datMat,5)
            normalArreglo(datMat,6)
            normalArreglo(datMat,7)
            normalArreglo(datMat,8)
            normalArreglo(datMat,9)
            normalArreglo(datMat,10)
            normalArreglo(datMat,11)

            tm=len(datMat) #aumentando la base de datos..

            #tm=267 #Solo para entrenar con la data dada
            arregloClas=datMat[-1]
            idClas=idMat[-1]
            arregloEntrenar=datMat[0:tm-1]
            etiquetaMat=etiquetaMat[0:tm-1]
            arregloClasificador=adaBootTrainDS(arregloEntrenar,etiquetaMat,10)
            predictor=adaClassify(arregloClas,arregloClasificador)
            r=predictor.item(0)
            FLAT_CLAS=1
            #print predictor
            nuevaCons=""" UPDATE base_datos
                SET GRUPO = %s,FLAT_CLAS= %s
                WHERE ID_IND = %s """

            data = (r,FLAT_CLAS,idClas)
            
            c.execute(nuevaCons,data)
            con.commit()
            return "Bien echo"
        except:
            con.rollback()
            print "Error: No se pudo obtener la data :("

    elif _op=="setar":
        try:
            _ID_IND=request.form['ID_IND']   
            lista_objectos=[]
            c.execute("SELECT * FROM base_datos WHERE ID_IND="+str(_ID_IND)+"")
            con.commit()
            filas = c.fetchall()
            lista_objectos.append(filas[0])
            j=json.dumps(lista_objectos)
            return j
        except:
            con.rollback()
            print "Error: No se pudo obtener la data"

    else:
        try:
            
            c.execute("SELECT ID_IND,C_GRUPO(GRUPO) FROM base_datos WHERE FLAT_CLAS='1' ORDER BY ID_IND ASC")
            con.commit()
            lista_objectos=[]
            filas = c.fetchall()
            for fila in filas:
                boton="<a href='#' class='Boton supercorto' id='SETEAR' onclick=setear("+str(fila[0])+")><i class='icono izquierda fas fa-cog'></i></a>"
                tnuevaCons=""" SELECT base_datos
                SET GRUPO = %s,FLAT_CLAS= %s
                WHERE ID_IND = %s """
                t=(fila[0],fila[1],boton)
                lista_objectos.append(t)
            j=json.dumps(lista_objectos)
            return j
        except:
            print "Error: No se pudo obtener la data"

    con.close()



if __name__ == "__main__":
    app.run(debug=True)
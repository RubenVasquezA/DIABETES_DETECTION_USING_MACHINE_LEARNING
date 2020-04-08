
#Estas funciones sirven para normalizar una variables si es necesaria...#
def minino(lista,var):
    arregloMinimo=[]
    for i in range(len(lista)):
        arregloMinimo.append(lista[i][var])
    return min(arregloMinimo)

def maximo(lista,var):
    arregloMaximo=[]
    for i in range(len(lista)):
        arregloMaximo.append(lista[i][var])
    return max(arregloMaximo)

def normalArreglo(lista,var):
    minimoLista=minino(lista,var)
    maximoLista=maximo(lista,var)
    for i in range(len(lista)):
        lista[i][var]=(lista[i][var]-minimoLista)/(maximoLista-minimoLista)
    return lista

def SeparandoData(arreglo):
    cantDat=len(arreglo)
    numCarac=len(arreglo[0])
    datMat=[]
    etiquetaMat=[]
    idMat=[]
    for j in range(cantDat):
        lineArreglo=[]
        for i in range(numCarac):
            if i==0:
                idMat.append(float(arreglo[j][i]))
            elif i==21:
                etiquetaMat.append(arreglo[j][i])
            else:
                lineArreglo.append(float(arreglo[j][i]))
        datMat.append(lineArreglo)
    return datMat,etiquetaMat,idMat

def CategorizarPrediccion(numero):
    if numero==1:
        return 'Control'
    else:
        return 'Patient'


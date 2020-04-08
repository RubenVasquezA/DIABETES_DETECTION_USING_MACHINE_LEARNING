from numpy import * 

#Se constriuira el Arbol de desiciones para clasificar, se plantea tambien aplicar un percetron y hacer una comparacion...
def stumpClassify(dataMatriz,dimen,threshVal,threshIneq):
    retArray=ones((shape(dataMatriz)[0],1))
    if threshIneq=='lt':
        retArray[dataMatriz[:,dimen]<=threshVal]=-1.0
    else:
        retArray[dataMatriz[:,dimen]>threshVal]=-1.0
    return retArray


#Vamos a construir el arbolm de desiciones 
def buildStump(dataArreglo,claseEtiquetas,D):
    dataMatriz=mat(dataArreglo);
    EtiquetaMatriz=mat(claseEtiquetas).T;
    m,n=shape(dataArreglo);
    numeroPasos=10.0;
    mejorStump={};
    mejorClaseEst=zeros((m,1));
    errorMin=inf;
    
    for i in range(n):
        rangoMin=dataMatriz[:,i].min();
        rangoMax=dataMatriz[:,i].max();
        tamanoPaso= (rangoMax-rangoMin)/numeroPasos;
        for j in range(-1,int(numeroPasos)+1):
            for inigualdad in ['lt','gt']:
                threshVal=(rangoMin+float(j)*tamanoPaso)
                valoresPredictivos= \
                    stumpClassify(dataMatriz,i,threshVal,inigualdad)
                errArr=mat(ones((m,1)))
                errArr[valoresPredictivos==EtiquetaMatriz]=0
                errorPonderado=D.T*errArr
                #
                if errorPonderado<errorMin:
                    errorMin=errorPonderado
                    mejorClaseEst=valoresPredictivos.copy();
                    mejorStump['dim']=i
                    mejorStump['thresh']=threshVal
                    mejorStump['ineq']=inigualdad
                    
    return mejorStump,errorMin,mejorClaseEst     

#Entrenando a Adaboots

def adaBootTrainDS(dataArreglo,claseEtiquetas,numIt=40):
    claseArregloDebil=[]
    m=shape(dataArreglo)[0]; 
    D=mat(ones((m,1))/m)
    aggClaseEst=zeros((m,1))
    for i in range(numIt):
        mejorStump,error,claseEst=buildStump(dataArreglo,claseEtiquetas,D)
        #print "D:",D.T
        alpha=float(0.5*log((1.0-error)/max(error,1e-16)))
        mejorStump['alpha']=alpha
        claseArregloDebil.append(mejorStump)
        #print "claseEst: ",claseEst.T
        expon=multiply(-1*alpha*mat(claseEtiquetas).T,claseEst)
        D=multiply(D,exp(expon))
        D=D/D.sum()
        aggClaseEst +=alpha*claseEst
        #print "aggClaseEst: ",aggClaseEst.T
        aggErrores=multiply(sign(aggClaseEst)!=mat(claseEtiquetas).T,ones((m,1)))
        tasaError=aggErrores.sum()/m
        #print "total error ",tasaError,"\n"
        if tasaError==0.0:break
    return claseArregloDebil
    
#Clasificando a Adaboots

def adaClassify(dataClase,arregloClasificador):
    matrizDatos=mat(dataClase)
    m=shape(matrizDatos)[0]
    aggClaseEst=mat(zeros((m,1)))
    for i in range(len(arregloClasificador)):
        claseEst=stumpClassify(matrizDatos,arregloClasificador[i]['dim'],\
                              arregloClasificador[i]['thresh'],\
                              arregloClasificador[i]['ineq'])
        aggClaseEst+=arregloClasificador[i]['alpha']*claseEst
        #print aggClaseEst
    return sign(aggClaseEst)
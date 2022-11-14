// esta funcion llamará a otras funciones



Chart.defaults.color='#ffff'
Chart.defaults.borderColor='#444'

const printCharts=()=>{

// traemos todos los datos a traves d eun fetch
fetchCoastersData('https://coasters-api.herokuapp.com/','https://coasters-api.herokuapp.com/country/Spain')
.then(([allCoasters,nationalCoasters])=>{
    //renderizamos todas lñas montañas rusas
    renderModelsChart(allCoasters)
    //renderizamos todas lñas montañas rusas naci
    renderFeaturesChart(nationalCoasters)
    //grafico de años
    renderYearsChart(allCoasters)

    //manejador de eventos para el select de paralizaciones
    enableEventHandlers(nationalCoasters)

   
})



}


const renderModelsChart=coasters=>{

// const models=coasters.map(coaster=>coaster.model)
// teenmos que evitar que se repitan l,os modelos en este caso
const uniqueModels=[...new Set(coasters.map(coaster=>coaster.model))]
console.log(uniqueModels)
const data={
    //labels y contador de modelos que hay para el grafico de dona
    labels:uniqueModels,
    datasets:[{
        data:uniqueModels.map(currentModel=>coasters.filter(coaster=>coaster.model===currentModel).length),
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20),
        hoverOffset: 4
    }]
}


const options={
    plugins:{
        legend:{position:'left'},
       
    },
    // tamaño del grafico
    
    maintainAspectRatio:false,
    responsive:false

}

    new Chart('canvas-unitsProduced',{type:'doughnut',data,options})
}


//segundo gráfico RADAR

const renderFeaturesChart=coasters=>{


const data={
    labels:coasters.map(coaster=>coaster.name),
    datasets:[{
        label:'Altura (m)',
        data:coasters.map(coaster=>coaster.height),
        borderColor: getDataColors()[0],
        backgroundColor: getDataColors(20)[0],
        // hoverOffset: 4
    }],

   
}


const options={
   
    plugins:{
        legend:{display:false},

    },
    scales:{
        r:{
            ticks:{display:false}
        
        }
    },
    // tamaño del grafico
    responsive:false,
    maintainAspectRatio:true
}



    new Chart('canvas-paralizaciones',{type:'bar',data,options})
}

const renderYearsChart=coasters=>{
    const years=['1998-2000','2001-2003','2004-2006','2007-2009','2013-2015','2016-2018','2019-2021','2021-2023','2023-2024','2025-2026','2027-2028','2029-2030']

const data={
    labels:years,
    datasets:[{
        data:getCoastersByYear(coasters,years),
        tension:.5,
        borderColor: getDataColors()[4],
        backgroundColor: getDataColors(20)[4],
        fill:true,
        pointBorderWidth:5
       
    }]

    
}


const options={
    
    plugins:{
        legend:{
            display:false
        },
       
            
        
    },
    responsive:false,
   maintainAspectRatio:false,
  
   
   


}
new Chart('canvas-realTime',{type:'line',data,options})

}




printCharts()
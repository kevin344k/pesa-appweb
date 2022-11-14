// Esta función  va ha recibir urls y las conveertirá enb array y lo parsea  a json para poner usarlos en el chart

const fetchCoastersData=(...urls)=>{
    const promises =urls.map(url=>fetch(url).then(response=>response.json()))
    return Promise.all(promises)

}



// función que retorna un array cuyo parametro sera la + opacidad a aplicar y que permitirá pintar los segmentos del gráfico.

const getDataColors=opacity=>{
    const colors =['#7448c2','#27ae60','#3498db','#2c3e50','#e74c3c','#1abc9c','#bdc3c7','#8e44ad','#f39c12','#ecf0f1']
    return colors.map(color=>opacity ? `${color+opacity}`:color)
}


//función que separa por rangos los años de las montañas rusas
const getCoastersByYear=(coasters,years)=>{
    const coastersByYear=years.map(yearsRange=>{
        const [from, to]=yearsRange.split('-')
        return coasters.filter(eachCoaster=>eachCoaster.year>=from && eachCoaster.year<=to).length
    })
    console.log(coastersByYear)
    return coastersByYear
}
//funcion ára actualizar un gráfico con nueva data

const updateChartData=(charId,data,label)=>{
    const chart=Chart.getChart(charId)
    chart.data.datasets[0].data=data
    chart.data.datasets[0].label=label
    chart.update()
}

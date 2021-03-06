import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"

const drawChart = (data, width, height) => {

    const margin = {top: 100, right: 50, bottom: 40, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ["#55869d", "#f5ab97", "#F29278", "#ee6c4a"]

    d3.select(".canvasTaxStacked > *").remove()
    d3.select(".tooltipStackedChart").remove()

    const namesArray = Object.keys(data[0])
    const xValue = Object.keys(data[0])[0]
    const  stackedKeys = namesArray.slice(1,namesArray.length)

    const svg = d3.select('.canvasTaxStacked').append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 
    const xAxisGroup = graph.append("g")
                                .attr("transform", `translate(0, ${graphHeight + 10})`)
                                .attr("class", "axis")
                            
    const yAxisGroup = graph.append("g")
                                 .attr("class", "axis")

    
    const stack = d3.stack()
                                .keys(stackedKeys)
                                .order(d3.stackOrderNone)
                                .offset(d3.stackOffsetNone);
        
        const tooltip = d3.select(".canvasTaxStacked").append("div")
                                .attr("class", "tooltipStackedChart")
                                .style("opacity", 0)
                                .style("position", "absolute")
                                .style("top", 0)
                                .style("left", 0)

const update = data => {

        const series = stack(data);
        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, 0.11])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3)
                              .domain(data.map(item => item.bar))

         const rects = graph.append("g")
                                .selectAll("g")
                                .data(series)
    
        rects.exit().remove()
    
        rects.selectAll("rect")
                                .data(d => d)
                                .enter().append("rect")
                                    .attr("x", d => xScale(d.data[xValue]) > 0 ? d => xScale(d.data[xValue]) : 0)
                                    .attr("y", d => yScale(d[1]))
                                .merge(rects)
                                    .attr("height", d => yScale(d[0]) - yScale(d[1]))
                                    .attr("width", xScale.bandwidth())

        rects.enter().append("g")
            .attr("fill", (d,i) => color[i])
            .attr("backgroundColor", (d,i) => color[i])
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => xScale(d.data[xValue]))
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())
      
                            .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal
                                console.log(name);
                                const nameIndex = stackedKeys.findIndex(type => type === name)
                                const thisColor = color[nameIndex]
                           
                                d3.select(n[i])
                                    .transition()
                                        .duration(100)
                                        .attr("opacity", 0.9)
                                        .attr("cursor", "pointer")
                            
                                        tooltip.transition()
                                        .duration(200)
                                        .style("opacity", 1)
                                        .style("pointer-events", "none")
                                        tooltip.html(
                                            `
                                            <div class="topHeader">
                                          hi
                                            </div>
                                            <div class="financialOutput">
                                                <div class="total" style="color: ${thisColor}; ">
                                                    <h3 class="title">  ${_.startCase(name)} </h3>
                                                    <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                                                    ${Math.round((d[1] - d[0])*1000)/10} 
                                                        <span> %</span>
                                                    </p>
                                                </div>
                                                <div class="total">
                                                    <h3 class="title"> Total Income In Bracket </h3>
                                                    <p class="value" style="border-left: .3px solid #72929B;">  
                                                
                                                        <span> K</span>
                                                    </p>
                                                </div>
                                            </div>
                                            `
                                        )
                                        
                                    })
                                    .on("mouseout", (d,i,n) => {d3.select(n[i])
                                        .transition()
                                        .duration(100)
                                        .attr("opacity", 1)
                            
                                        tooltip.transition()
                                        .duration(100)
                                        .style("opacity", 0)   
                                            })
                                    .on('mousemove', function(d) { // when mouse moves                  
                                            tooltip.style('top', (d3.event.layerY - 20) + 'px') // always 10px below the cursor
                                                .style('left', (d3.event.layerX + 30) + 'px'); // always 10px to the right of the mouse
                                            });

            var ticks = [1,2];
            var tickLabels = ['Before Retirement','After Retirement',]
                

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `${d * 100}%`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}


const StackedBarChart = ({data}) =>  {

    const inputRef = useRef(null)

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(data, width, height)
    }, [data])

        return (
            <Canvas className="canvasTaxStacked" ref={inputRef}>
            </Canvas>
        )
}


const mapStateToProps = createStructuredSelector({
    data: stackedBarData,
})

export default connect(mapStateToProps)(StackedBarChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

`


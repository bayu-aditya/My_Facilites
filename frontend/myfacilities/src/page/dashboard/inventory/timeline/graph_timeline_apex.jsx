import React from 'react';
import ReactApexChart from 'react-apexcharts'

class Graph_Timeline_Apex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        this.tools = {
            series: [
                {
                    data: []
                }
            ],
            options: {
              chart: {
                height: 350,
                type: 'rangeBar'
              },
              plotOptions: {
                bar: {
                  horizontal: true
                }
              },
              xaxis: {
                  type: 'datetime',
                  labels: {
                      datetimeUTC: false
                  }
              },
              annotations: {
                xaxis: [
                    {
                    x: new Date().getTime(),
                    borderColor: 'red',
                    label: {
                        style: {
                            color: 'black',
                        },
                        text: 'Today'
                    }
                    }
                ]
              },
              tooltip: {
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    let idx = dataPointIndex;
                    let username = w.globals.seriesX[0][idx];
                    let start_date = new Date(w.globals.seriesRangeStart[0][[idx]]).toString().slice(0,24);
                    let finish_date = new Date(w.globals.seriesRangeEnd[0][[idx]]).toString().slice(0,24);
                    return '<div class="arrow_box">' +
                    '<span><b>' + username + '</b></span><br/>' +
                    '<span><b>Start:</b> ' + start_date + '</span><br/>' +
                    '<span><b>Finish:</b> ' + finish_date + '</span>' +
                    '</div>'
                }
              }
            },
        };
        this.data = [];
    }
    initGraph() {
        let self = this;
        this.props.data.map(
            function(row, index) {
                console.log(row)
                let username = row["username"];
                let start = row["start"];
                let finish = row["finish"];
                let data_row = {
                    x: username,
                    y: [
                        new Date(start).getTime(), 
                        new Date(finish).getTime()
                    ],
                    fillColor: '#00E396'
                }
                self.data.push(data_row)   
            }
        )
        this.tools.series[0].data = this.data;
    }
    render() {
        return (
            <div>
                {this.initGraph()}
                <ReactApexChart options={this.tools.options} series={this.tools.series} type="rangeBar" height={350} />
            </div>
        )
    }
}

export default Graph_Timeline_Apex;
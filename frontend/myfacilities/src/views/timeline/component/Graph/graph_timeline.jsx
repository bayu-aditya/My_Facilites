import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker } from '@material-ui/pickers';
import { 
    getInitialWeekMonday, 
    getLastWeekMonday } from './tools';
import ReactApexChart from 'react-apexcharts'
import { Grid } from '@material-ui/core';

class GraphTimeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tools: {
                series: [
                    {
                        data: []
                    }
                ],
                options: {
                    plotOptions: {
                        bar: {
                        horizontal: true
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        hideOverlappingLabels: false,
                        labels: {
                            datetimeUTC: false,
                            style: {
                                fontSize: '12px',
                            },
                            format: 'ddd, dd MMM',
                        },
                        axisTicks: {
                            height: this.height,
                        },
                        min: getInitialWeekMonday(new Date()).getTime(),
                        max: getLastWeekMonday(new Date()).getTime(),
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '12px'
                            }
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
                                text: 'Now'
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
            }
        };
        this.data = [];
        this.height = 0;
    }
    initGraph() {
        let self = this;
        let usernames = [];
        let unique_usernames = [];
        this.props.data.map(
            function(row, index) {
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
                self.data.push(data_row);
                usernames.push(username);
                return null;
            }
        )
        this.state.tools.series[0].data = this.data;
        unique_usernames = [...new Set(usernames)];
        this.height = unique_usernames.length * 50 + 70;
        console.log(this.height)
    }
    handleFromDateChange = date => {
        this.setState(prevState => ({
            tools: {
                ...prevState.tools,
                options: {
                    ...prevState.tools.options,
                    xaxis: {
                        ...prevState.tools.options.xaxis,
                        min: date.getTime()
                    }
                }
            }
        }));
    }
    handleToDateChange = date => {
        this.setState(prevState => ({
            tools: {
                ...prevState.tools,
                options: {
                    ...prevState.tools.options,
                    xaxis: {
                        ...prevState.tools.options.xaxis,
                        max: date.getTime()
                    }
                }
            }
        }));
    }
    render() {
        return (
            <div>
                <Grid container justify="space-around">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="From"
                            value={this.state.tools.options.xaxis.min}
                            onChange={this.handleFromDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="To"
                            value={this.state.tools.options.xaxis.max}
                            onChange={this.handleToDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                {this.initGraph()}
                <ReactApexChart options={this.state.tools.options} series={this.state.tools.series} type="rangeBar" height={this.height} />
            </div>
        )
    }
}

GraphTimeline.propTypes = {
    data: PropTypes.array.isRequired,
}

export default GraphTimeline;
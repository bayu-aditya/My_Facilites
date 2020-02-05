import React from 'react';
import Chart from 'react-google-charts';

export class Graph_Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.data = [];
    }
    graph() {
        let self = this;
        extractDataToInput(this.props.data[0])
        this.props.data.map(
            function(row, index) {
                self.data.push(extractDataToInput(row, index+1))
            }
        )
        let header = [[
                { type: 'string', id: 'Name_member_row' },
                { type: 'string', id: 'Name_member' },
                { type: 'string', role: 'tooltip', 'p': {'html': true}},
                { type: 'date', id: 'Start' },
                { type: 'date', id: 'End' },        
        ]]
        let data = header.concat(this.data)
        return(
            <Chart 
                width={'100%'}
                chartType="Timeline"
                data={data}
                loader={<div>loading chart ...</div>}
                options={{
                    hAxis: {
                        minValue: new Date(2020, 0, 26, 0, 0, 0),
                        maxValue: new Date(2020, 1, 2, 0, 0, 0),
                    },
                    timeline: {
                        colorByRowLabel: true
                    },
                    allowHtml: true,
                }}
            />
        )
    }
    render() {
        if (this.props.data.length === 0){
            return <div>Task is empty.</div>
        } else {
            return (
                <div>
                    {this.graph()}
                </div>
            )
        }
    }
}

function extractDataToInput(data_row, idx) {
    if (!data_row) {
        return []
    }
    let username = data_row["username"];
    let start_date = data_row["start"].split("T")[0];
    let start_date_year = start_date.split("-")[0];
    let start_date_month = start_date.split("-")[1] - 1;
    let start_date_date = start_date.split("-")[2];
    let start_time = data_row["start"].split("T")[1];
    let start_time_hour = start_time.split(":")[0];
    let start_time_min = start_time.split(":")[1];
    let start_time_sec = start_time.split(":")[2];
    let finish_date = data_row["finish"].split("T")[0];
    let finish_date_year = finish_date.split("-")[0];
    let finish_date_month = finish_date.split("-")[1] - 1;
    let finish_date_date = finish_date.split("-")[2];
    let finish_time = data_row["finish"].split("T")[1];
    let finish_time_hour = finish_time.split(":")[0];
    let finish_time_min = finish_time.split(":")[1];
    let finish_time_sec = finish_time.split(":")[2];
    let row = [
        username,
        idx,
        tooltipHTML(username, data_row["start"], data_row["finish"]),
        new Date(
            start_date_year, start_date_month, start_date_date, 
            start_time_hour, start_time_min, start_time_sec
            ),
        new Date(
            finish_date_year, finish_date_month, finish_date_date, 
            finish_time_hour, finish_time_min, finish_time_sec
            ),
    ]
    return (row)
}

function tooltipHTML(username, start, finish) {
    return '<div style="padding:5px 5px 5px 5px; width:250px">' +
        '<b>Username: ' + String(username) + '</b>' +  
        '<table class="table table-sm">' + 
        '<tr><td><b>Start:</b></td><td>' + new Date(start).toString().slice(0,16) + '</td>' +
        '<td>' + new Date(start).toString().slice(16,24) + '</td></tr>' + 
        '<tr><td><b>Finish:</b></td><td>' + new Date(finish).toString().slice(0,16) + '</td>' +
        '<td>' + new Date(finish).toString().slice(16,24) + '</td></tr>' + 
        '</table>' + '</div>'
}
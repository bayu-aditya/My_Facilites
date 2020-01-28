import React from 'react';
import Chart from 'react-google-charts';

export class Graph_Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // data: [],
            data: [
                [
                    'bayu',
                    'bayu',
                    new Date(2020, 1, 20, 12, 0, 0),
                    new Date(2020, 1, 22, 13, 30, 0),
                ],
                [
                    'rasyid',
                    'rasyid',
                    new Date(2020, 1, 20, 0, 0, 0),
                    new Date(2020, 1, 20, 15, 30, 0),
                ],
                [
                    'lendi',
                    'lendi',
                    new Date(2020, 1, 20, 16, 0, 0),
                    new Date(2020, 1, 20, 17, 30, 0),
                ],
            ]
        }
    }
    componentDidMount() {
        // graph();
    }
    graph() {
        let header = [[
                { type: 'string', id: 'Name_member_row' },
                { type: 'string', id: 'Name_member' },
                { type: 'date', id: 'Start' },
                { type: 'date', id: 'End' },        
        ]]
        let data = header.concat(this.state.data)
        console.log(data)
        return(
            <Chart 
                width={'100%'}
                chartType="Timeline"
                data={data}
                options={{
                    hAxis: {
                        title: "testing",
                        minValue: new Date(2020, 1, 16, 0, 0, 0),
                        maxValue: new Date(2020, 1 , 23, 0, 0, 0),
                    },
                    timeline: {
                        colorByRowLabel: true
                    }
                }}
            />
        )
    }
    render() {
        return (
            <div>
                {this.graph()}
            </div>
        )
    }
}
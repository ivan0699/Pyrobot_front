import React, { useEffect, useState, useRef } from 'react';
import { Sidebar} from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {getMatchs} from '../services/MatchService'
import { Toast } from 'primereact/toast';
import '../style/Datatable.css';

//dialog def 81
import {JoinMatch} from './JoinMatch.jsx'
export const DataTableMatchs = ({spawnJoin}) => {

    const [matchs, setMatchs] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const [visibleDialog, setVisibleDialog] = useState(false);
    // const [dialog, setDialog] = useState([]);
    const toast = useRef(null);


    useEffect(() => {
        getDataMatch()
    },[]);
    const getDataMatch = async () =>{
        const data = await getMatchs()
        setMatchs(data)
    }
    const onRowSelect = (e) => {
        console.log(e);
        // localStorage.setItem('joinMatchId', e.data.id);
        console.log(e.data.name);
        let name = e.data.name
        let id = e.data.id
        spawnJoin(name, id);

        // setDialog([<JoinMatch/>])
    }

    const onRowUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.data.name}`, life: 3000 });
    }


    return (

            
 

            <div className="carda">

                <DataTable className='dt' data-testid="dataTable" value={matchs} scrollable scrollHeight="900px" selectionMode="single" selection={selectedMatch} onSelectionChange={e => setSelectedMatch(e.value)} dataKey="id" 
                onRowSelect={onRowSelect} onRowUnselect={onRowUnselect}>
                    <Column field="name" header="Name"></Column>
                    <Column field="games" header="Games"></Column>
                    <Column field="rounds" header="Rounds"></Column>
                    <Column field="num_players_min" header="Min Players"></Column>
                    <Column field="num_players_max" header="Max Players"></Column>
                </DataTable>
            </div>
            
           

        

   
    );
}

export default DataTableMatchs
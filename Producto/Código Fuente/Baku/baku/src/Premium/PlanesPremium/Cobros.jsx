import * as React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import * as planPremiumService from '../premiumService.ts';
import { useTheme } from '@mui/material/styles';

export default function ColumnTypesGrid() {
    const [rows, setRows] = React.useState("");
    const [pageSize, setPageSize] = React.useState(5);

    React.useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await planPremiumService.obtenerCobros();
        console.log(res)
        //cada objeto agregarlo al array
        const rows = res.data.map(row => ({
            id: row._id,
            Plan: row.plan,
            Usuario: row.usuario[0].usuario,
            Estado: row.estado,
            'Fecha Desde': new Date(row.createdAt).toLocaleDateString(),
            'Fecha Vencimiento': row.estado == "Aprobado" ? '' : new Date(row.fechaVencimiento).toLocaleDateString()
        }));
        setRows(rows);
        
    }

    const columns = React.useMemo(
        () => [
            { field: 'Plan', type: 'string', flex: 1, minWidth: 100, },
            { field: 'Usuario', type: 'string', flex: 1, minWidth: 100 },
            { field: 'Estado', type: 'string', flex: 1, minWidth: 100 },
            { field: 'Fecha Desde', type: 'string', flex: 1, minWidth: 100 },
            { field: 'Fecha Vencimiento', type: 'string', flex: 1, minWidth: 100}
        ]
    );

    return (
        <div style={{ height: '40em', width: '100%' }}>
            <br />
            <DataGrid
                sx={{ height: '40em', width: '100%' }}
                columns={columns}
                rows={rows}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
            />
        </div>
    );
}

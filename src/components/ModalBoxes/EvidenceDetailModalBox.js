import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CustomTableContainer } from './modalboxes.styles';

function createData(curie, subcurie, prefferedLabel) {
  return { curie, subcurie, prefferedLabel };
}

const rows = [
  createData('SWISSPROT-GRN_HUMAN', 'GSK3 beta', 'SWISSPROT-GRN_HUMAN'),
  createData('HGNC:4601', 'GSK3 beta', 'HGNC:4601'),
  createData('SWISSPROT-GRN_HUMAN 2', 'GSK3 beta', 'SWISSPROT-GRN_HUMAN 2'),
];

const EvidenceDetailModalBox = () => {
  return (
    <CustomTableContainer component={Paper}>
      <Table size="small" aria-label="evidence details table">
        <TableHead>
          <TableRow>
            <TableCell align="left" padding="none"></TableCell>
            <TableCell align="left" padding="none" className="th-tabel-cell">
              ID(Curie)
            </TableCell>
            <TableCell align="left" padding="none" className="th-tabel-cell">
              Preferred label
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.curie}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                align="left"
                style={{
                  padding: '3px',
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell style={{ padding: '3px' }} component="th" align="left">
                <span style={{ textTransform: 'uppercase', fontSize: '16px' }}>
                  {row.curie}
                </span>
                <p className="red-p">{row.subcurie}</p>
              </TableCell>
              <TableCell
                align="left"
                style={{
                  padding: '3px',
                }}
              >
                <div className="with-info-icon-wrap">
                  <span>{row.prefferedLabel}</span>
                  <InfoOutlinedIcon fontSize="small" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default EvidenceDetailModalBox;

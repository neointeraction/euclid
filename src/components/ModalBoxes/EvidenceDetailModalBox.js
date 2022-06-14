import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
    <TableContainer
      style={{
        padding: '8px',
        boxShadow: '0px 2px 28px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        maxWidth: 525,
      }}
      component={Paper}
    >
      <Table size="small" aria-label="evidence details table">
        <TableHead>
          <TableRow>
            <TableCell align="left" padding="none"></TableCell>
            <TableCell
              align="left"
              padding="none"
              style={{ fontWeight: '600', paddingBottom: '4px' }}
            >
              ID(Curie)
            </TableCell>
            <TableCell
              align="left"
              padding="none"
              style={{ fontWeight: '600', paddingBottom: '4px' }}
            >
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
                <span style={{ marginTop: '-32px', background: 'red' }}>
                  {index + 1}
                </span>
              </TableCell>
              <TableCell style={{ padding: '3px' }} component="th" align="left">
                <span style={{ textTransform: 'uppercase', fontSize: '16px' }}>
                  {' '}
                  {row.curie}
                </span>
                <p style={{ color: '#833B3B', fontSize: '14px' }}>
                  {row.subcurie}
                </p>
              </TableCell>
              <TableCell
                align="left"
                style={{
                  padding: '3px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9.5px',
                    fontSize: '16px',
                    marginTop: '-16px',
                  }}
                >
                  <span>{row.prefferedLabel}</span>
                  <InfoOutlinedIcon fontSize="small" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EvidenceDetailModalBox;

import {useTheme} from '@mui/material/styles';
import {Box, IconButton} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import "./TablePaginationActions.scss"

interface Props {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

export default function TablePaginationActions({ count, page, rowsPerPage, onPageChange }: Props) {
    const theme = useTheme();
    const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    const handleFirst = (e: React.MouseEvent<HTMLButtonElement>) => onPageChange(e, 0);
    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => onPageChange(e, page - 1);
    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => onPageChange(e, page + 1);
    const handleLast = (e: React.MouseEvent<HTMLButtonElement>) => onPageChange(e, lastPage);

    return (
        <Box className="table-pagination-actions">
            <IconButton onClick={handleFirst} disabled={page === 0} size="small">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handlePrev} disabled={page === 0} size="small">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNext} disabled={page >= lastPage} size="small">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLast} disabled={page >= lastPage} size="small">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Divider,
  Alert,
  Skeleton,
  Grid
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  OpenInNew as OpenIcon,
  ContentCopy as CopyIcon,
  TrendingUp as TrendingIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { GlobalContext, MyState, CongresoPreguntas } from '@/core';

interface ModernTableProps {
  data: CongresoPreguntas[];
  loading?: boolean;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRefresh?: () => void;
}

export const ModernTableComponent: React.FC<ModernTableProps> = ({
  data,
  loading = false,
  totalCount = 0,
  onPageChange,
  onPageSizeChange,
  onRefresh
}) => {
  const { t } = useTranslation('global');
  const { state } = useContext<MyState>(GlobalContext);
  const [selectedRow, setSelectedRow] = useState<CongresoPreguntas | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleViewDetails = (row: CongresoPreguntas) => {
    setSelectedRow(row);
    setDetailOpen(true);
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'Expediente',
      headerName: 'Expediente',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight="bold" color="primary">
            {params.value || '-'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Presentada',
      headerName: 'Fecha',
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <CalendarIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {params.value || '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'Contenido',
      headerName: 'Contenido',
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.3
            }}
          >
            {params.value || '-'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'Grupo_Parlamentario',
      headerName: 'Grupo',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        if (!value || value === '') return <Typography variant="body2">-</Typography>;

        const cleanedValue = value.replace(/['"]/g, '').substring(1).slice(0, -1);
        return (
          <Chip
            label={cleanedValue}
            size="small"
            color="primary"
            variant="outlined"
            icon={<BusinessIcon />}
          />
        );
      },
    },
    {
      field: 'diputados_autores',
      headerName: 'Diputados',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        if (!value || value === '') return <Typography variant="body2">-</Typography>;

        const cleanedValue = value.replace(/['"]/g, '').substring(1).slice(0, -1);
        return (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2" noWrap>
              {cleanedValue}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'comunidades_tags',
      headerName: 'Comunidad',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        if (!value || value === '') return <Typography variant="body2">-</Typography>;

        const cleanedValue = value.replace(/['"]/g, '').substring(1).slice(0, -1);
        return (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LocationIcon fontSize="small" color="action" />
            <Typography variant="body2" noWrap>
              {cleanedValue}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Ver detalles">
            <IconButton
              size="small"
              onClick={() => handleViewDetails(params.row)}
              color="primary"
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Abrir enlace">
            <IconButton
              size="small"
              onClick={() => window.open(params.row.url, '_blank')}
              color="secondary"
            >
              <OpenIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  if (loading && data.length === 0) {
    return (
      <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cargando resultados...
        </Typography>
        <Box sx={{ height: 400 }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1, borderRadius: 1 }} />
          ))}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{
        p: 3,
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        color: 'white'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              <TrendingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Resultados de Búsqueda
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {totalCount} preguntas parlamentarias encontradas
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Refrescar">
              <IconButton onClick={onRefresh} sx={{ color: 'white' }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Exportar
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Data Grid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          onPaginationModelChange={(model) => {
            onPageChange?.(model.page + 1);
            onPageSizeChange?.(model.pageSize);
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e0e0e0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Detalles de la Pregunta Parlamentaria
            </Typography>
            <IconButton onClick={() => setDetailOpen(false)}>
              <ShareIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          {selectedRow && (
            <Stack spacing={3}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Información General
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Expediente
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {selectedRow.Expediente || '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Fecha
                      </Typography>
                      <Typography variant="body1">
                        {selectedRow.Presentada || '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Contenido
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {selectedRow.Contenido || '-'}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      startIcon={<CopyIcon />}
                      onClick={() => handleCopyToClipboard(selectedRow.Contenido || '')}
                    >
                      Copiar
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        Información Política
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Grupo Parlamentario
                          </Typography>
                          <Typography variant="body1">
                            {selectedRow.Grupo_Parlamentario?.replace(/['"]/g, '').substring(1).slice(0, -1) || '-'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Diputados
                          </Typography>
                          <Typography variant="body1">
                            {selectedRow.diputados_autores?.replace(/['"]/g, '').substring(1).slice(0, -1) || '-'}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        Información Geográfica
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Comunidad
                          </Typography>
                          <Typography variant="body1">
                            {selectedRow.comunidades_tags?.replace(/['"]/g, '').substring(1).slice(0, -1) || '-'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Provincia
                          </Typography>
                          <Typography variant="body1">
                            {selectedRow.provincia_tags?.replace(/['"]/g, '').substring(1).slice(0, -1) || '-'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Municipio
                          </Typography>
                          <Typography variant="body1">
                            {selectedRow.municipios_tags?.replace(/['"]/g, '').substring(1).slice(0, -1) || '-'}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDetailOpen(false)}>
            Cerrar
          </Button>
          {selectedRow?.url && (
            <Button
              variant="contained"
              startIcon={<OpenIcon />}
              onClick={() => window.open(selectedRow.url, '_blank')}
              sx={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
                }
              }}
            >
              Ver Original
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
